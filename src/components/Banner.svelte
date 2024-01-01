<script>
  export let repeatCount = 13;
  export let text;
  export let image;
  export let rotation;
</script>

<div class="banner-container" style="--rotation: {rotation}">
  <div class="banner">
    <div class="banner-text">
      {#each Array(repeatCount).fill() as _}
        {text} <img class="imagedivider" src={image} alt="Banner Divider" />
      {/each}
    </div>
  </div>
</div>

<style>
  .banner {
    background-color: #191919;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    background-color: #191919;
    width: 200%;
    height: 10rem;
    color: white;
    font-size: 3rem;
    transform: rotate(var(--rotation));
    margin-left: -5px;
  }

  .banner-text {
    animation: scrollText 20s linear infinite;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    font-weight: 500;
    top: 1em;
  }

  .imagedivider {
    display: inline;
    width: 50px;
    padding-right: 20px;
  }

  @keyframes scrollText {
    0% {
      left: 0%;
    }
    100% {
      left: -95%;
    }
  }

  @media (max-width: 900px) {
    .banner {
      width: 200%;
      margin-left: -5px;
      margin-right: -5px;
      overflow-x: hidden;
      height: 5rem;
      font-size: 2rem;
    }

    .banner-text {
      font-weight: 500;
      top: 1.3rem;
    }

    .imagedivider {
      display: inline;
      width: 25px;
      padding-right: 20px;
    }
  }
</style>
