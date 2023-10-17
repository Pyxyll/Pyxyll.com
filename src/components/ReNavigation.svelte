<script>
  let mobileNavOpened = false;
  const toggleMobileNav = () => (mobileNavOpened = !mobileNavOpened);
</script>

<header>
  <!-- svelte-ignore illegal-attribute-character -->
  <nav class:dropdown-opened={mobileNavOpened}>
    <a class="logo" href="/">
      <img
        src="images/offsetlogo.svg"
        alt="Our professional logo (ideally an svg!)"
      />
    </a>
    <div class="dropdown-link-container">
      <a href="about">About</a>
      <a href="works">Works</a>
      <a href="contact">Contact</a>
    </div>
    <button
      class="mobile-dropdown-toggle"
      on:click={toggleMobileNav}
      aria-hidden="true"
    />
  </nav>
</header>

<style>
  header {
    background: var(--white);
    border-top: solid 4px var(--black);
    border-bottom: solid 4px var(--black);
    padding: 20px 50px;
    font-size: 110%;
    text-transform: uppercase;
  }

  nav {
    max-width: 1600px;
    display: flex;
    align-items: center;
    margin: auto;
  }

  .logo {
    margin-right: auto;
    width: 75px;
  }

  .dropdown-link-container > a {
    margin-left: 70px;
    text-decoration: none;
    padding-bottom: 5px;
    color: black;
    background-image: linear-gradient(black, black);
    background-size: 0% 0.2em;
    background-position-y: 100%;
    background-position-x: 0%;
    background-repeat: no-repeat;
    transition: background-size 0.2s ease-in-out;
  }

  .dropdown-link-container > a:hover {
    background-size: 100% 0.2em;
  }

  .mobile-dropdown-toggle {
    display: none;
  }

  @media (max-width: 768px) {
    .logo,
    .mobile-dropdown-toggle {
      z-index: 1;
    }

    .mobile-dropdown-toggle {
      display: inline-block;
      width: 30px;
      height: 2px;
      background-color: currentColor;
      position: relative;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: background 0.2s;
    }

    .mobile-dropdown-toggle:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); /* Or any color you prefer */
    }

    .mobile-dropdown-toggle::before,
    .mobile-dropdown-toggle::after {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      position: absolute;
      left: 0;
      transition: transform 0.2s, opacity 0.2s;
    }

    .mobile-dropdown-toggle::before {
      top: -10px; /* position the top line */
    }

    .mobile-dropdown-toggle::after {
      bottom: -10px; /* position the bottom line */
    }

    .dropdown-link-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      height: -webkit-fill-available;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      margin: 0;
      padding-left: 7vw;
      padding-right: 7vw;
      background: var(--white);
      z-index: 1;
      opacity: 0;
      transform: translateY(-100%);
      transition: transform 0.2s, opacity 0.2s;
      border-top: solid 4px var(--black);
      border-bottom: solid 4px var(--black);
    }

    .dropdown-link-container > a {
      font-size: 3em;
      font-weight: 500;
      padding: 1em 0;
    }

    nav.dropdown-opened > .dropdown-link-container {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
