const $ = selecter => document.querySelector(selecter)

function App() {
  // form 태그가 자동으로 전송되는 것을 막아준다.
  const menuForm = $('#espresso-menu-form')
  menuForm.addEventListener('submit', event => {
    event.preventDefault()
  })
  //   메뉴를 입력 받는다.
  const coffeMenu = $('#espresso-menu-name')
  coffeMenu.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      insertList()
    }
    const menuButton = $('#espresso-menu-submit-button')
    menuButton.addEventListener('click', () => {
      insertList()
    })
  })

  function insertList() {
    const expressoMenuName = coffeMenu.value
    const menuItemTemplate = expressoMenuName => {
      return `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${expressoMenuName}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`
    }
    coffeMenu.value = ''
    // $('#espresso-menu-list').insertAdjacentHTML('beforebegin', menuItemTemplate(expressoMenuName))

    $('#espresso-menu-list').innerHTML += menuItemTemplate(expressoMenuName)
  }
}
App()
