<script>
  let mobileNavOpened = false;
  const toggleMobileNav = () => (mobileNavOpened = !mobileNavOpened);

  import { onMount } from "svelte";

  let activeLink;

  onMount(() => {
    activeLink = window.location.pathname;
  });
</script>

<header>
  <!-- svelte-ignore illegal-attribute-character -->
  <nav class:dropdown-opened={mobileNavOpened}>
    <a class="logo" href="/">
      <img
        src="/images/offsetlogo.svg"
        alt="Pyxyll Logo"
        width="75px"
        height="57px"
      />
    </a>
    <div class="dropdown-link-container">
      <a href="/about" class:active={activeLink === "/about"}>About</a>
      <a href="/works" class:active={activeLink === "/works"}>Works</a>
      <a href="/contact" class:active={activeLink === "/contact"}>Contact</a>
    </div>
    <div
      class="mobile-dropdown-toggle"
      on:click={toggleMobileNav}
      aria-hidden="true"
    >
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="ham-menu">
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </a>
    </div>
  </nav>
</header>

<style>
  .ham-menu {
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    cursor: pointer;
    align-items: end;
    margin-top: -15px;
  }

  .bar {
    background-color: var(--black);
    color: black;
    height: 4px;
    margin: 3px;
    transition: 0.2s;
  }

  .bar:nth-child(1) {
    width: 20px;
  }

  .bar:nth-child(2) {
    width: 30px;
  }

  .bar:nth-child(3) {
    width: 15px;
  }
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
    transition:
      transform 0.3s,
      scale 0.3s;
  }

  .logo:hover {
    transform: translateY(-2px);
    scale: 105%;
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

  a.active {
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
      transition:
        transform 0.2s,
        opacity 0.2s;
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
