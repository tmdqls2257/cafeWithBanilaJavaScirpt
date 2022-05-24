const $ = selecter => document.querySelector(selecter)

class Store {
  constructor() {
    this.actions = {}
    this.mutations = {}
    this.state = {}
  }

  dispatch(actionKey, payload) {
    this.status = 'action'
    this.actions[actionKey] = payload
  }

  useselector(actionKey) {
    return {
      payload: this.actions[actionKey],
    }
  }
}

const store = new Store()

function App() {
  this.menu = { espresso: [], frappuccino: [], blended: [], desert: [] }
  this.currentCategory = 'espresso'
  // form 태그가 자동으로 전송되는 것을 막아준다.
  const menuForm = $('#menu-form')
  menuForm.addEventListener('submit', e => {
    e.preventDefault()
  })

  const insertCoffeeMenu = () => {
    const MenuName = coffeMenu.value
    this.menu[this.currentCategory].push({ name: MenuName })
    store.dispatch('insertMenu', this.menu)
    render()
    // $('#menu-list').insertAdjacentHTML('beforebegin', menuItemTemplate(MenuName))
    coffeMenu.value = ''
    updateMenuCount()
  }
  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((item, idx) => {
        return `<li id = '${idx}' class="menu-list-item d-flex items-center py-2">
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
    $('#menu-list').innerHTML = template
  }
  function updateMenuCount() {
    const liCount = $('#menu-list').querySelectorAll('li').length
    $('.menu-count').innerText = `총 ${liCount}개`
  }

  const updateCoffeeMenu = e => {
    const menuId = e.target.closest('li').id
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    //   가장 가까운 list의 값을 가져옵니다.
    const updatedMenuName = prompt('메뉴를 수정하세요', $menuName.innerText)
    this.menu[this.currentCategory][menuId].name = updatedMenuName
    store.dispatch('insertMenu', this.menu)
    //   menuName에 할당해서는 안된다. menuName는 innerText값만 할당하는 것이기 때문에 수정이 되지 않는다.
    $menuName.innerText = updatedMenuName
  }

  const removeMenuName = e => {
    const menuId = e.target.closest('li').id
    this.menu[this.currentCategory] = this.menu[this.currentCategory].filter(
      (_, idx) => idx !== Number(menuId)
    )
    store.dispatch('insertMenu', this.menu)
    e.target.closest('li').remove()
    updateMenuCount()
  }

  //   메뉴를 입력 받는다.
  const coffeMenu = $('#menu-name')
  coffeMenu.addEventListener('keypress', e => {
    e.key === 'Enter' && coffeMenu.value !== '' && insertCoffeeMenu()
  })
  const menuButton = $('#menu-submit-button')
  menuButton.addEventListener('click', () => {
    coffeMenu.value !== '' && insertCoffeeMenu()
  })

  //   이벤트 위임을 통한 동적인 자식 태크에 이벤트 전달
  $('#menu-list').addEventListener('click', e => {
    e.target.classList.contains('menu-edit-button') && updateCoffeeMenu(e)
    e.target.classList.contains('menu-remove-button') &&
      confirm('삭제하시겠습니까?') &&
      removeMenuName(e)
  })

  $('nav').addEventListener('click', e => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name')
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName
      this.currentCategory = categoryName
      $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`
      render()
    }
  })
}

const app = new App()
