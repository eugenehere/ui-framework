module.exports = {
  _template: `
    <div on:click="onClickHomePage">Home page</div>
    <div>go to <b on:click="onClickMyLink">another</b> page {{ state.counter }}</div>    
    <my-title sub="HELLO" />
    <div>
      {{ if (state.myList.length < 10) { '<b on:click="onAddClick">ADD</b>' } }}
      {{ if (state.myList.length) {
        \`<span
          on:click="onRemoveClick"
          style="color: red"
        >REMOVE</span>\`
      } }}
    </div>
    <div id="myList">
        {{
            state.myList.map(item => {
                return \`
                    <div>Look, my number is \${item}</div>
                    <my-title />
                \`
            }).join('')
        }}
    </div>  
  `,
  _depends: [
    'components/my-title',
  ],
  _state: {
    counter: 1,
    textVariable: 'OhOhhhh',
    myList: [1,2]
  },
  _loaded() {
    console.log('loaded')
  },
  _updated() {
    console.log('component updated')
  },
  onClickMyLink() {
    this._loadView('words/single')
  },
  onClickHomePage() {
    console.log('handling onClickHomePage')
  },
  onAddClick() {
    this._setState(state => state.myList.push(state.counter))
    this._setState(state => state.counter++)
  },
  onRemoveClick() {
    this._setState(state => state.myList.pop())
  },
}
