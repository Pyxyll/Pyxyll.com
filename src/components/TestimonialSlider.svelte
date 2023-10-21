<script>
  export let testimonials = [];
  let currentIndex = 0;
  const intervalTime = 3000; // 3 seconds
  let interval;

  // Start the auto-scroll
  function startAutoScroll() {
    interval = setInterval(() => {
      if (currentIndex < testimonials.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, intervalTime);
  }

  // Stop the auto-scroll on mouseover
  function stopAutoScroll() {
    clearInterval(interval);
  }

  startAutoScroll();

  // Restart auto-scroll on mouseout
  function restartAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
  }
</script>

<svelte:head>
  <style>
    /* Add your styles for the slider here */
  </style>
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div on:mouseover={stopAutoScroll} on:mouseout={restartAutoScroll}>
  {#each testimonials as testimonial, index}
    {#if index === currentIndex}
      <div class="testimonial-card">
        <img src={testimonial.image} alt={testimonial.name} />
        <h3>{testimonial.name}</h3>
        <p>{testimonial.content}</p>
      </div>
    {/if}
  {/each}
</div>
