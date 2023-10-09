<script>
  let icons = [
    "images/stack/htmlico.svg",
    "images/stack/cssico.svg",
    "images/stack/jsico.svg",
    "images/stack/nodeico.svg",
    "images/stack/astroico.svg",
    "images/stack/tailwindico.svg",
    "images/stack/strapiico.svg",
    "images/stack/supabaseico.svg",
    "images/stack/vercelico.svg",
    "images/stack/wordpressico.svg",
    "images/stack/htmlico.svg",
    "images/stack/cssico.svg",
    "images/stack/jsico.svg",
    "images/stack/nodeico.svg",
    "images/stack/astroico.svg",
    "images/stack/tailwindico.svg",
    "images/stack/strapiico.svg",
    "images/stack/supabaseico.svg",
    "images/stack/vercelico.svg",
    "images/stack/wordpressico.svg",
  ];

  let speed = 2; // pixels per frame
  let position = 0;
  let carousel;

  import { onMount } from "svelte";

  onMount(() => {
    function animate() {
      position += speed;

      if (position >= carousel.firstChild.offsetWidth) {
        carousel.appendChild(carousel.firstChild);
        position -= carousel.firstChild.offsetWidth;
      }

      carousel.style.transform = `translateX(-${position}px)`;

      requestAnimationFrame(animate);
    }

    animate();
  });

  function handleMouseOver() {
    speed = 1; // slow down
  }

  function handleMouseOut() {
    speed = 2; // return to original speed
  }
</script>

<div
  bind:this={carousel}
  class="icon-carousel"
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
>
  {#each icons as icon (icon)}
    <img src={icon} alt="Icon" class="icon-item" />
  {/each}
</div>

<style>
  .icon-carousel {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
  }

  .icon-carousel img {
    width: 50px;
    height: 50px;
    margin: 10px;
  }
</style>
