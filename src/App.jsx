import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

const syntaxHighlighterStyle = {
  backgroundColor: "#f5f5f5",
  borderRadius: 4,
  width: "calc(100vw - 60px)",
  overflow: "scroll",
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { name: false, mobile: false, email: false, userInfo: null, userIdentity: null };
  }

  checkbox(label, value) {
    return <div className="field-checkbox" key={value}>
      <input type="checkbox"
             id={"checkbox_" + label}
             checked={this.state[value]}
             onChange={(e) => this.setState({ [value]: e.target.checked })}/>
      <label htmlFor={"checkbox_" + label}>{label}</label>
    </div>;
  }

  doRequest() {
    let fields = [];
    ['name', 'mobile', 'email'].forEach(item => {
      if (this.state[item]) {
        fields.push(item);
      }
    });
    if (fields.length) {
      window.sys.getUserInfo(fields, data => {
        console.log(data);
        this.setState({ userInfo: data });
      }, () => {
        alert("用户拒绝了请求")
      })
    } else {
      alert("请至少选择一项")
    }
  }

  getUserIdentity() {
    window.sys.getUserIdentity(data => {
      this.setState({ userIdentity: data });
    })
  }

  render() {
    return <div>
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <h1 className="title">
                用户信息授权DEMO
              </h1>
              <div>
                <div className="fields">
                  {this.checkbox("用户名", "name")}
                  {this.checkbox("手机号", "mobile")}
                  {this.checkbox("邮箱", "email")}
                </div>
                <button className="button is-primary" onClick={() => this.doRequest()}>请求以上用户信息
                </button>
                <hr/>
                {!!this.state.userInfo ?
                  <SyntaxHighlighter wrapLines={true} customStyle={syntaxHighlighterStyle}
                                     language='json'>{JSON.stringify(this.state.userInfo, null, 4)}</SyntaxHighlighter> :
                  <div className="notification pre-line">(无结果)</div>}
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <h1 className="title">
                用户身份验证DEMO
              </h1>
              <div>
                <button className="button is-primary" onClick={() => this.getUserIdentity()}>点击获得用户身份
                </button>
                <hr/>
                {!!this.state.userIdentity ?
                  <SyntaxHighlighter wrapLines={true} customStyle={syntaxHighlighterStyle}
                                     language='json'>{JSON.stringify(this.state.userIdentity, null, 4)}</SyntaxHighlighter> :
                  <div
                    className="notification pre-line">(未获得)</div>}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  }
}

export default App;