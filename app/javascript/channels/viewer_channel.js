import consumer from "channels/consumer"

consumer.subscriptions.create("ViewerChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("conneced to view channel")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(data)
    // if(data.slug){
    //   document.querySelector('.viewer').classList.remove('show')
    //   setTimeout(() => {
    //     location.href = `${location.origin}/viewer?scene=${data.slug}`
    //   }, 2.5 * 1000)
    // }
    
    let currentViewer = document.querySelector('.viewer.show')
    document.querySelector('body').insertAdjacentHTML('afterbegin', data.html);

    let nextViewer = document.querySelector(".viewer")
    nextViewer.classList.add('show')
    
    setTimeout(() => {
      currentViewer.classList.remove('show')
    }, 2.5 * 1000)

    setTimeout(() => {
      currentViewer.remove()
    }, 5 * 1000)
  }
});
