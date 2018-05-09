import React, { Component } from 'react';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { name: false, mobile: false, email: false, userInfo: null };
  }

  checkbox(label, value) {
    return <div key={value}>
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

  render() {
    return <div>
      <h1>
        用户信息授权DEMO
      </h1>
      <div>
        <h2>请求用户信息</h2>
        {this.checkbox("用户名", "name")}
        {this.checkbox("手机号", "mobile")}
        {this.checkbox("邮箱", "email")}
        <button onClick={() => this.doRequest()}>请求</button>

        <h2> 用户信息请求结果 </h2>
        {!!this.state.userInfo ? <div>{JSON.stringify(this.state.userInfo)}</div> :
          <div>(无结果)</div>}
      </div>
    </div>
  }
}

export default App;