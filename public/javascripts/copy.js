const copyButton = document.querySelector('#copy')
const shortUrl = document.querySelector('#short_url')


copyButton.addEventListener('click', async function copyButtonOnClicked(event) {
  console.log(shortUrl.innerText)
  await navigator.clipboard.writeText(shortUrl.innerText)
  alert("Copied the text: " + shortUrl.innerText)
})
