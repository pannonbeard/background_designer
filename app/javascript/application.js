// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "@oddcamp/cocoon-vanilla-js";
import "channels"

document.addEventListener('turbo:load', () => {
  const viewer = document.querySelector(".viewer")
  if(viewer){
    setTimeout(() => {
      viewer.classList.add("show")
    }, 2.5 * 1000)
  }

  const switchButtons = document.querySelectorAll(".scene-switch-button")

  switchButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const sceneUrl = button.dataset.url
      button.innerText = "Switching..."
      await fetch(sceneUrl)

      button.innerText = "Switch To"
    })
  })
})
