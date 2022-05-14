const $ = selecter => document.querySelector(selecter)

function App() {
  this.menu = []
  // form 태그가 자동으로 전송되는 것을 막아준다.
  const menuForm = $('#espresso-menu-form')
  menuForm.addEventListener('submit', e => {
    e.preventDefault()
  })

  function insertCoffeeMenu() {
    const expressoMenuName = coffeMenu.value
    this.menu.push({ name: expressoMenuName })
    const template = this.menu
      .map(item => {
        return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join('')
    // $('#espresso-menu-list').insertAdjacentHTML('beforebegin', menuItemTemplate(expressoMenuName))

    $('#espresso-menu-list').innerHTML = template
    coffeMenu.value = ''
    updateMenuCount()
  }

  function updateMenuCount() {
    const liCount = $('#espresso-menu-list').querySelectorAll('li').length
    $('.menu-count').innerText = `총 ${liCount}개`
  }

  function updateCoffeeMenu(e) {
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    //   가장 가까운 list의 값을 가져옵니다.
    const menuName = $menuName.innerText
    const updatedMenuName = prompt('메뉴를 수정하세요', menuName)

    //   menuName에 할당해서는 안된다. menuName는 innerText값만 할당하는 것이기 때문에 수정이 되지 않는다.
    $menuName.innerText = updatedMenuName
  }

  function removeMenuName(e) {
    e.target.closest('li').remove()
    updateMenuCount()
  }

  //   메뉴를 입력 받는다.
  const coffeMenu = $('#espresso-menu-name')
  coffeMenu.addEventListener('keypress', e => {
    e.key === 'Enter' && coffeMenu.value !== '' && insertCoffeeMenu()
  })
  const menuButton = $('#espresso-menu-submit-button')
  menuButton.addEventListener('click', e => {
    coffeMenu.value !== '' && insertCoffeeMenu.call(this)
  })

  //   이벤트 위임을 통한 동적인 자식 태크에 이벤트 전달
  $('#espresso-menu-list').addEventListener('click', e => {
    e.target.classList.contains('menu-edit-button') && updateCoffeeMenu(e)
    e.target.classList.contains('menu-remove-button') &&
      confirm('삭제하시겠습니까?') &&
      removeMenuName(e)
  })
}
const app = new App()
app
