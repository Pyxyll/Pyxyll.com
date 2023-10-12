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

  let speed = 1; // pixels per frame
  let carousel;

  import { onMount } from "svelte";

  onMount(() => {
    requestAnimationFrame(function scroll() {
      carousel.scrollLeft += speed;

      if (carousel.scrollLeft >= carousel.firstChild.offsetWidth) {
        carousel.appendChild(carousel.firstChild);
        carousel.scrollLeft -= carousel.firstChild.offsetWidth;
      }

      requestAnimationFrame(scroll);
    });
  });

  function handleMouseOver() {
    speed = 0.1; // slow down
  }

  function handleMouseOut() {
    speed = 0.5; // return to original speed
  }
</script>

<div
  bind:this={carousel}
  class="icon-carousel"
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
>
  {#each icons as icon}
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
