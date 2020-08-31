/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import "./style.less";
import * as pdfjsLib from "pdfjs-dist";
// The workerSrc property shall be specified.
// pdfjsLib.GlobalWorkerOptions.workerSrc = "http://0.0.0.0:3030/common/file/pdf.worker.min.js";
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js";

// the default params
const DEFAULT_DESIRE_WIDTH = 980;
const DEFAULT_SCALE = 1;
export default class PDFReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdf: null,
      style: null,
      page: 1,
      totalPage: 0,
    };
    this.canvas = React.createRef();
  }
  componentDidMount() {
    const {
      url,
      data,
      showAllPage,
      onDocumentComplete,
      getPageNumber,
    } = this.props;
    const dom = this.canvas.current;
    if (url) {
      let obj = {
        url: null,
      };
      // fetch pdf and render
      if (typeof url === "string") {
        obj.url = url;
      } else if (typeof url === "object") {
        obj = url;
      }
      pdfjsLib.getDocument(obj).then(pdf => {
        // is exit onDocumentComplete or not
        if (!showAllPage) {
          if (onDocumentComplete) {
            this.props.onDocumentComplete(pdf.numPages);
          }
        }
        this.setState({ totalPage: pdf.numPages });
        this.setState({ pdf }, () => {
          if (showAllPage) {
            this.renderAllPage();
          } else {
            this.renderPage(dom, null);
          }
        });
      });
    } else {
      // loaded the base64
      const loadingTask = pdfjsLib.getDocument({ data });
      loadingTask.promise.then(pdf => {
        // is exit onDocumentComplete or not
        if (!showAllPage) {
          if (onDocumentComplete) {
            this.props.onDocumentComplete(pdf.numPages);
          }
        }
        this.setState({ pdf }, () => {
          if (showAllPage) {
            this.renderAllPage();
          } else {
            this.renderPage(dom, null);
          }
        });
      });
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { pageScroll, pdfDiv } = props;
    if (pdfDiv && (pageScroll || pageScroll === 0)) {
      var elmnt = document
        .querySelector("#" + pdfDiv)
        .querySelector("#my-pdf")
        .querySelector("#div-pdf-" + pageScroll);
      if (elmnt) {
        elmnt.scrollIntoView();
      }
    }
    return { ...state, page: props.page };
  }
  // in the new lifestyle we can use this in shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    // eslint-disable-next-line no-unused-vars
    const { pdf } = this.state;
    const { showAllPage } = nextProps;
    const dom = this.canvas.current;
    if (showAllPage) return true;
    if (nextProps.page !== this.state.page) {
      this.renderPage(dom, nextProps.page);
    }
    return true;
  }
  renderPage(dom, spnum) {
    let self = this;
    return new Promise(function(resolve, reject) {
      const { pdf, page } = self.state;
      const { width, scale, showAllPage } = self.props;
      let currentPage = page || 1;
      if (spnum) {
        currentPage = spnum;
      }
      if (currentPage > pdf.numPages) {
        currentPage = pdf.numPages;
      }
      if (currentPage < 1) {
        currentPage = 1;
      }

      pdf.getPage(currentPage).then(page => {
        let desiredWidth;
        // if this.props has width props
        if (width) {
          desiredWidth = width;
        } else {
          desiredWidth = DEFAULT_DESIRE_WIDTH;
        }
        let desireScale;
        // if this.props has scale props
        if (scale) {
          desireScale = scale;
        } else {
          let templeView = page.getViewport(DEFAULT_SCALE);
          desireScale = desiredWidth / templeView.width;
        }
        const viewport = page.getViewport(desireScale);
        const canvas = dom;
        const canvasContext = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        if (showAllPage) {
          self.setState({
            style: {
              height: "auto",
              width: canvas.width,
            },
          });
        } else {
          self.setState({
            style: {
              height: canvas.height,
              width: canvas.width,
            },
          });
        }
        const renderContext = {
          canvasContext,
          viewport,
        };
        page.render(renderContext).promise.then(function() {
          resolve(true);
        });
      });
    });
  }
  renderAllPage() {
    var self = this;
    const { pdf, totalPage } = this.state;
    const { width, scale, onDocumentComplete } = this.props;
    if (totalPage > 0) {
      let proArr = [];
      for (let i = 1; i <= totalPage; i++) {
        const dom = this["canvas" + i];
        proArr.push(this.renderPage(dom, i));
      }
      Promise.all(proArr).then(function(values) {
        if (onDocumentComplete) {
          self.props.onDocumentComplete(pdf.numPages);
        }
      });
    }
  }
  getCurrentPageNumber(page) {
    const { getPageNumber } = this.props;
    if (getPageNumber) {
      this.props.getPageNumber(page);
    }
  }
  getPageScroll(page) {
    const { pageScroll } = this.props;
    if (pageScroll) {
      var elmnt = document.getElementById("div-pdf-" + page);
      elmnt.scrollIntoView();
    }
  }
  render() {
    const { style, totalPage } = this.state;
    const { showAllPage } = this.props;
    let tempArr = new Array(totalPage);
    tempArr.fill(0);
    return (
      <div id="my-pdf" style={style} className="pdf_render__container">
        {showAllPage ? (
          <React.Fragment>
            {tempArr.map((item, i) => {
              var index = i + 1;
              return (
                <div
                  className="react-pdf__Page"
                  data-page-number={index + ""}
                  id={"div-pdf-" + index}
                  key={"div-" + index}
                  onClick={this.getCurrentPageNumber.bind(this, index)}>
                  <canvas
                    ref={canvas => {
                      this["canvas" + index] = canvas;
                    }}
                    key={index + ""}
                    id={"canvas-pdf-" + index}
                    data-page={index + ""}
                    className={"canvaspdf"}></canvas>
                </div>
              );
            })}
          </React.Fragment>
        ) : (
          <canvas ref={this.canvas} />
        )}
      </div>
    );
  }
}
