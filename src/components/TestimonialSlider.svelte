<script>
  import { onMount } from "svelte";
  let testimonials = [];

  let currentIndex = 0;

  onMount(async () => {
    const response = await fetch("../data/testimonials.json");
    testimonials = await response.json();
    console.log(testimonials);
  });

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  function prevTestimonial() {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
  }
</script>

<div class="testimonial-container">
  {#if testimonials.length > 0}
    <div class="testimonial">
      <img src={testimonials[currentIndex].imgSrc} alt="Testimonials" />
      <h2>{testimonials[currentIndex].name}</h2>
      <p>{testimonials[currentIndex].body}</p>
      <a href={testimonials[currentIndex].link}>Read More</a>
    </div>

    <button on:click={prevTestimonial}>Previous</button>
    <button on:click={nextTestimonial}>Next</button>
  {:else}
    <p>Loading testimonials...</p>
  {/if}
</div>

<style>
  /* Add your styling here */
</style>
