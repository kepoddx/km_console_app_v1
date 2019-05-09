var App = createClass({
  componentDidMount: function () {
    this.setState({ schools: stories })
  },
  render: function (props, state) {
    return (
      h('div', { id: 'gallery-div' },
        h(schoolsCmp, { schools: state.schools }))
    )
  }
});
var schoolsCmp = createClass({
  render: function (props) {
    var items = props.schools.map(function (item) {
      return (
        h('li', { class: "d-flex school-container" },
          h('div', { class: 'school-image' }),
          h('div', { class: 'school-title' }, item.title))
      )
    });
    return (
      h('ul', { class: 'schools' }, items)
    )
  }
});

preact.render(h(Gallery), document.getElementById("gallery"))