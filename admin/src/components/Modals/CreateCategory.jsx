import { Button, TextField } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import React from "react";
import axios from "axios";
import { HOST } from "../../Api";

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      category: "",
      name: this.props.title || "",
      error: "",
      apiError: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false,
    });
    console.log(files);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  onChange(event) {
    const { name, value } = event.target;
    const tmp = {};
    tmp[name] = value;
    this.setState(tmp);
  }

  submit() {
    if (this.state.name === "") {
      this.setState({
        error: "Category Name Can't Be Empty!",
      });
      return;
    }
    const body = new FormData();
    body.append("name", this.state.name);

    if (this.state.files && this.state.files.length > 0) {
      body.append("icon", this.state.files[0]);
    }

    const config = {
      withCredentials: true,
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let request;
    if (this.props.ID) {
      request = axios.put(`${HOST}categories/${this.props.ID}`, body, config);
    } else {
      request = axios.post(`${HOST}categories/add`, body, config);
    }

    request
      .then((res) => {
        if (res.data) {
          if (res.data.status) {
            if (this.props.onUpdate) {
              this.props.onUpdate();
            }
          } else {
            this.setState({
              apiError: res.data.error || "Something Went Wrong",
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({ apiError: "" + err });
      });
  }

  render() {
    return (
      <div className="create-category modal">
        <h1 style={{ marginBottom: "8px" }}>Create Category</h1>

        {this.state.apiError !== "" ? (
          <span style={{ color: "red" }}>{this.state.apiError}</span>
        ) : (
          ""
        )}

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "150px",
            width: "300px",
          }}
        >
          <TextField
            required
            error={this.state.error !== ""}
            helperText={this.state.error}
            name="name"
            value={this.state.name}
            label="Category Name"
            onChange={this.onChange}
          />

          <Button onClick={this.handleOpen} variant="contained">
            Add Thumbnail
          </Button>

          <Button variant="contained" color="primary" onClick={this.submit}>
            {this.props.title ? "Update" : `Submit`}
          </Button>
        </form>

        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default CreateCategory;
