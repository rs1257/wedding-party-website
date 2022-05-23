import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LazyLoad from 'react-lazy-load';

import { galleryNeedsUpdate } from "../../actions/updateActions";
import validateUploadInput from '../../validation/upload';
import TextFieldInput from '../common/TextFieldInput';
import Button from '../common/Button';

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [], loaded: 0, images: {}, galleryAccess: false, errors: {}, galleryAccessCode: '' };

    this.fileField = React.createRef();
    this.handleFilesSelected = this.handleFilesSelected.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.remove = this.remove.bind(this);

    this.handleImageClick = this.handleImageClick.bind(this);
    this.download = this.download.bind(this);
    this.downloadPreviewImg = this.downloadPreviewImg.bind(this);
    this.downloadTileImg = this.downloadTileImg.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.previousImg = this.previousImg.bind(this);
    this.nextImg = this.nextImg.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/files/list")
      .then((res) => {
        this.setState({ images: res.data });
      })
      .catch((err) => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needsUpdate) {
      axios
        .get("/api/files/list")
        .then((res) => {
          this.setState({ images: res.data });
          this.props.galleryNeedsUpdate(false);
        })
        .catch((err) => console.log(err));
    }
  }

  onClickHandler(event) {
    event.preventDefault();
    const data = new FormData();
    this.state.files.forEach(file => {
      data.append("file", file[0]);  
    }); 
    axios.post("/api/files/upload", data, {
      onUploadProgress: ProgressEvent => {
         this.setState({
           loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
       })}
    }).then((res) => {
      this.props.galleryNeedsUpdate(true); // this can now be removed as its in the same component
      this.setState({ files: []});
      const msg = document.getElementsByClassName('successful-upload')[0]; // currently only supports one to a page
      msg.style.display = "block"; //should I disable the upload button for a few seconds?
      document.getElementById('test').value = ''; // reset the files count
      setTimeout(() => {
        const msg = document.getElementsByClassName("successful-upload")[0];
        this.setState({ loaded: 0 });
        msg.style.display='none'}, 3000);
    })
    .catch((err) => {
      console.log(err)
    });
  }

  handleFilesSelected(event) {
    const files = Array.from(event.target.files);

    const errors = validateUploadInput(files);
    console.log(errors);

    var allFiles = this.state.files;
    files.forEach((f) => {
      allFiles.push([f, URL.createObjectURL(f)]);
    });

    this.setState({ files: allFiles });
  }

  remove(event) {
    event.preventDefault();
    this.state.files.map((file) => {
      if (file[1] === event.target.value) {
        var index = this.state.files.indexOf(file);
        if (index !== -1) {
          this.state.files.splice(index, 1);
          this.setState({ files: this.state.files });
        }
      }
      return 0;
    });
  }

  handleImageClick(event) {
    event.preventDefault();
    const modal = document.getElementsByClassName('image-preview')[0];

    var img = modal.firstChild.firstChild;

    img.src = event.target.src;
    img.dataset.id = event.target.dataset.id;
    modal.style.display = 'block';
  }

  closeModal(event) {
    event.preventDefault();

    const element = event.target;
    const txt = element.textContent || element.innerText;
    if (element.nodeName === 'DIV' || txt === 'Close') {
      const modal = document.getElementsByClassName('image-preview')[0];
      modal.style.display = 'none';
    }
  }

  nextImg(event) {
    event.preventDefault();
    var currentImg = document.querySelector('div.image-preview > div > img');
    const nextId = parseInt(currentImg.dataset.id) + 1;

    if (this.state.images[nextId] !== undefined) {
      currentImg.dataset.id = nextId;
      currentImg.src = "/" + this.state.images[currentImg.dataset.id];
    }
  }

  previousImg(event) {
    event.preventDefault();
    var currentImg = document.querySelector('div.image-preview > div > img');
    const nextId = parseInt(currentImg.dataset.id) - 1;
    
    if (this.state.images[nextId] !== undefined) {
      currentImg.dataset.id = nextId;
      currentImg.src = "/" + this.state.images[currentImg.dataset.id];
    }
  }

  download() {
    axios
        .get("/api/files/download", {responseType:'arraybuffer'})
        .then((res) => {
          this.createDownloadLink(res.data, 'images.zip');
        })
        .catch((err) => console.log(err));
  }

  downloadPreviewImg(event) {
    event.preventDefault();
    var currentImg = document.querySelector('div.image-preview > div > img');
    axios(currentImg.src, {responseType:'arraybuffer'}).then((res) => {
      const name = currentImg.src.split('/').slice(-1)[0];
      this.createDownloadLink(res.data, name)
    });
  }

  downloadTileImg(event) {
    event.preventDefault();
    const img = event.target.previousSibling.firstChild;
    axios(img.src, {responseType:'arraybuffer'}).then((res) => {
      const name = img.src.split('/').slice(-1)[0];
      this.createDownloadLink(res.data, name)
    });
  }

  createDownloadLink(data, filename) {
    const downloadUrl = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();

    link.remove();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    axios
      .post("/api/settings/galleryCode", { name: 'GalleryAccessCode', code: this.state.galleryAccessCode } )
      .then((res) => {
        const result = res.data.equal;
        if (result !== this.state.galleryAccess) {
          this.setState({ galleryAccess: res.data.equal });
        }
      })
      .catch((err) => {
        this.setState({errors: err.response.data});
      });

  }

  render() {
    const { errors } = this.state;

    return (
      <section id="gallerypage">
        <h1>Gallery</h1>
        {!this.state.galleryAccess && 
        <form className="gallery-access-form" noValidate onSubmit={this.onSubmit}>
          <TextFieldInput
            label="Unlock Gallery Images"
            type="text"
            placeholder="Code"
            name="galleryAccessCode"
            value={this.state.galleryCode}
            error={errors.galleryCode}
            onChange={this.onChange}
          />
          <Button name="gallery-code-btn" value="Submit" />
        </form>
        }
        { this.state.galleryAccess &&
        <>
          <form className="gallery-upload-form" onSubmit={this.onClickHandler}>
            <label className="custom-file-upload">
              <input
                ref={this.fileField}
                type="file"
                name="user[image]"
                id="test"
                multiple={true}
                onChange={this.handleFilesSelected}
              />
              Choose files to Upload
            </label>
            <div className="preview">
              {this.state.files.map((f) => {
                return [
                  <div className="img-card">
                    <img src={f[1]} alt="" />
                    <button value={f[1]} onClick={this.remove} className="remove-btn">
                      x
                    </button>
                  </div>
                ];
              })}
            </div>
            <div className="successful-upload">
              <span>&#10003;</span> Upload Successful
            </div>
            {this.state.files.length > 0 && <><progress max="100" value={this.state.loaded}>
              {Math.round(this.state.loaded, 2)}%
            </progress>
            <button>Upload</button></>}
          </form>
          <div className="preview">
            {this.state.images.length > 0 &&
              this.state.images.map((f, index) => {
                return (
                  <div className="img-card" key={index}>
                    <LazyLoad
                    width={275}
                    height={150}
                    debounce={false}
                    offsetVertical={500}
                    >
                    <img src={"/" + f} alt="" data-id={index} onClick={this.handleImageClick} />
                    </LazyLoad>
                    <button className="img-download-btn" onClick={this.downloadTileImg}>&#10515;</button>
                  </div>
                );
              })}
          </div>
          <button className="img-download-all-btn" onClick={this.download}>Download All Images</button>
          <div className="image-preview" onClick={this.closeModal}>
            <div className="image-preview-container">
              <img src="#" alt=""></img>
              <div className="btn-group">
              <button className="img-btn previous-btn" onClick={this.previousImg}>Previous</button>
              <button className="img-btn download-btn" onClick={this.downloadPreviewImg}>Download</button>
              <button className="img-btn close" onClick={this.closeModal}>Close</button>
              <button className="img-btn next-btn" onClick={this.nextImg}>Next</button>
              </div>
            </div>
          </div>
      </>}
      </section>
    );
  }
}

GalleryPage.propTypes = {
  galleryNeedsUpdate: PropTypes.func.isRequired,
  needsUpdate: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  needsUpdate: state.needsUpdate,
});

export default connect(mapStateToProps, { galleryNeedsUpdate })(GalleryPage);
