function Container() {
  return (
    <nav className='panel'>
      <div className='panel-block'>
        <p className='control has-icons-left'>
          <input
            className='input'
            type='text'
            placeholder='Search'
          />
          <span className='icon is-left'>
            <i
              className='fas fa-search'
              aria-hidden='true'
            ></i>
          </span>
        </p>
      </div>

      <a className='panel-block is-active'>
        <span className='panel-icon'>
          <ion-icon
            className='fas fa-book'
            name='home-outline'
            aria-hidden='true'
          ></ion-icon>
          {/* <i></i> */}
        </span>
        bulma
      </a>
      <a className='panel-block'>
        <span className='panel-icon'>
          <i
            className='fas fa-book'
            aria-hidden='true'
          ></i>
        </span>
        marksheet
      </a>
      <a className='panel-block'>
        <span className='panel-icon'>
          <i
            className='fas fa-book'
            aria-hidden='true'
          ></i>
        </span>
        minireset.css
      </a>
      <a className='panel-block'>
        <span className='panel-icon'>
          <i
            className='fas fa-book'
            aria-hidden='true'
          ></i>
        </span>
        jgthms.github.io
      </a>
    </nav>
  );
}

export default Container;
