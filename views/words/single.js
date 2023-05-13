module.exports = {
  _template: `
    <div>Single word page</div>
    <div on:click="onBack">Back to home</div>
  `,
  onBack() {
    this._loadView('home')
  }
}
