// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "@oddcamp/cocoon-vanilla-js";
import "channels"


// Handling file load

const layersList = document.querySelector('.scene-layers')
const preview = document.querySelector(".scene-preview")

document.addEventListener('cocoon:after-insert', (e) => {
  let listCount = Array.from(layersList.querySelectorAll('.nested-fields')).length
  const recentLayer = Array.from(layersList.querySelectorAll('.nested-fields')).pop()
  console.log(recentLayer)

  const layerId = generateUUID()

  recentLayer.setAttribute('data-layerId', layerId)

  const previewLayer = addLayerToPreview(layerId)

  recentLayer.querySelector("input").addEventListener("change", (e) => {
    getFileData(e.target, previewLayer)
  })

  console.log(listCount)
  recentLayer.querySelector('.scene_layers_stack input').value = listCount
})

document.addEventListener('cocoon:before-remove', (e) => {
  const layerId = e.detail.dataset.layerid
  // document.querySelector(`[data-layerId="${layerId}"]`).remove()
})

function addLayerToPreview(layerId){
  const newLayer = document.createElement("div")
  newLayer.setAttribute('data-layerId', layerId)
  newLayer.classList.add('scene-preview--layer')
  preview.append(newLayer)

  return newLayer
}

function getFileData(input, previewLayer) {
  const file = input.files[0];
  if (file) {
    console.log(file)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", function () {
      if(file.type.includes('video')){
        previewLayer.innerHTML = `
          <video src="${this.result}" autoplay loop />
        `
      } else {
        previewLayer.style = `background-image: url("${this.result}")`
      }
    });    
  }
}

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.querySelector(".viewer")
  if(viewer){
    setTimeout(() => {
      viewer.classList.add("show")
    }, 2.5 * 1000)
  }
})
