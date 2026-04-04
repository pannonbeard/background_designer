import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scene-layer"
export default class extends Controller {
  static targets = ['layer', 'preview', 'input', 'previewHolder']

  connect() {
    this.inputTargets.forEach(input => {
      input.addEventListener('change', (e) => {
      let file = e.target.files[0]
      let reader = new FileReader()

      reader.onload = () => {
        console.log("file content:", reader.reslt)
      }
      
        reader.onerror = () => {
        console.error("Error reading file");
      };

      reader.readAsText(file);
    })
    })
  }

  inputTargetConnected(element){
    element.addEventListener('change', (e) => {
      let file = e.target.files[0]
      let reader = new FileReader()

      reader.onerror = () => {
        console.error("Error reading file");
      };

      if(file.type.startsWith('image/')){
        reader.onload = (e) => {

          let template = ` <div class='scene-preview--layer' data-index='<%= index %>' 
             style="background-image: url('${e.target.result}'); background-size: cover" 
             data-scene-layer-target='preview'></div>`
          this.previewHolderTarget.insertAdjacentHTML('beforeend', template)

          console.log("file content:", reader.result)
        }
        reader.readAsDataURL(file);
      } else {
        reader.onload = () => {
          console.log("file content:", reader.result)
        }

        reader.readAsText(file);
      }
    })
  }

  shiftUp(e){
    let button = e.target
    let shiftingIndex = button.closest('.layer-fields').dataset.index

    this.layerTargets.forEach((layer, index) => {
      if(index == shiftingIndex){
        let beforeSibling = getPreviousSiblingByClass(layer, 'layer-fields')
        let parentEl = layer.parentNode
        console.log(beforeSibling)
        parentEl.insertBefore(layer, beforeSibling)
      }
    })

    this.layerTargets.forEach((layer, index) => {
      let stackInput = layer.querySelector('.stack')
      if(stackInput){
        stackInput.value = index;
      }
      layer.dataset.index = index;
    })

    this.previewTargets.forEach((layer, index) => {
      if(index == shiftingIndex){
        let beforeSibling = layer.previousElementSibling
        let parentEl = layer.parentNode
        parentEl.insertBefore(layer, beforeSibling)
      }
    })

    this.previewTargets.forEach((layer, index) => {
      layer.dataset.index = index;
    })
  }

  shiftDown(e){
    let button = e.target
    let shiftingIndex = button.closest('.layer-fields').dataset.index

    this.layerTargets.forEach((layer, index) => {
      if(index == shiftingIndex){
        let siblingEl = getNextSiblingByClass(layer, 'layer-fields')
        let parentEl = layer.parentNode
        parentEl.insertBefore(siblingEl, layer)
      }
    })

    this.layerTargets.forEach((layer, index) => {
      let stackInput = layer.querySelector('.stack')
      if(stackInput){
        stackInput.value = index;
      }
      layer.dataset.index = index;
    })

    this.previewTargets.forEach((layer, index) => {
      if(index == shiftingIndex){
        let siblingEl = layer.nextElementSibling
        let parentEl = layer.parentNode
        parentEl.insertBefore(siblingEl, layer)
      }
    })

    this.previewTargets.forEach((layer, index) => {
      layer.dataset.index = index;
    })
  }


}

function getPreviousSiblingByClass(el, className) {
  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.classList.contains(className)) {
      return sibling;
    }
    sibling = sibling.previousElementSibling;
  }
  return null;
}

function getNextSiblingByClass(el, className) {
  let sibling = el.nextElementSibling;
  while (sibling) {
    if (sibling.classList.contains(className)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
  return null;
}