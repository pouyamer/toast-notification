/*
  Make sure that these two will match with the css file
*/
const notificationDuration = 5000
const notificationTransitionDuration = 500

let currentNotificationID = 1

const notificationConfig = [
  {
    type: "success"
  },
  {
    type: "error"
  },
  {
    type: "warning"
  },
  {
    type: "info"
  }
]

class Notification {
  constructor(title, body, type) {
    // types can be:
    // - success
    // - error
    // - warning
    // - info

    this.title = title
    this.body = body
    this.type = type
    this.notificationElement = null
    this.timeout = null

    this.id = currentNotificationID
    currentNotificationID++
  }

  // Creates the notification element
  create() {
    const notificationElement = document.createElement("div")
    notificationElement.classList.add("notification")
    notificationElement.classList.add(this.type)

    const titleElement = document.createElement("h3")
    titleElement.classList.add("title")
    titleElement.innerText = this.title

    const bodyElement = document.createElement("p")
    bodyElement.classList.add("body")
    bodyElement.innerText = this.body

    const barContainerElement = document.createElement("div")
    barContainerElement.classList.add("bar-container")

    const barElement = document.createElement("div")
    barElement.classList.add("bar")

    barContainerElement.appendChild(barElement)
    notificationElement.appendChild(titleElement)
    notificationElement.appendChild(bodyElement)
    notificationElement.appendChild(barContainerElement)

    this.notificationElement = notificationElement
  }

  // Removes Notification from DOM
  destroy() {
    this.notificationElement.remove()
    clearTimeout(this.timeout)
  }

  // Waits for notificationDuration and then removes it from DOM
  async hide() {
    await new Promise((resolve, reject) => {
      this.timeout = setTimeout(() => {
        this.notificationElement.classList.remove("show")
        this.notificationElement.classList.add("hide")
        resolve(1)
      }, notificationDuration)
    })
    await new Promise((resolve, reject) => {
      this.timeout = setTimeout(() => {
        this.destroy()
        resolve(1)
      }, notificationTransitionDuration - 100)
    })
  }

  // Shows the notification and after notificationDuration it will hide it
  show() {
    const notificationContainerElement = document.querySelector(
      ".notification-container"
    )
    notificationContainerElement.appendChild(this.notificationElement)
    this.notificationElement.classList.add("show")
    this.hide()
  }
}

// An easy to use function to create a notification
const createNotification = (title, body, type) => {
  const notification = new Notification(title, body, type)
  notification.create()
  notification.show()
}
