<script>
  import { fade } from "svelte/transition";

  let step = 0;
  let name = "";
  let email = "";
  let domain = "";
  let subject = "";
  let message = "";
  let file;
  let editing = false;

  function nextStep(skip = false) {
    if (step === 0 && name) step += 1;
    else if (step === 1 && email) step += 1;
    else if (step === 2 && domain) step += 1;
    else if (step === 3 && subject) step += 1;
    else if (step === 4 && message) step += 1;
    else if (step === 5 && (file || skip)) step += 1;
    else if (step === 6) step += 1; // go to submission
  }

  function handleFileChange(event) {
    file = event.target.files[0];
    nextStep(); // Automatically move to next step if a file is selected.
  }

  function goToStep(s) {
    step = s;
    editing = true;
  }
</script>

<form action="/api/contact.cjs" method="POST" enctype="multipart/form-data">
  {#if step === 0}
    <div in:fade={{ duration: 300 }}>
      <label for="name">Enter your name:</label>
      <input type="text" bind:value={name} />
      <button on:click={nextStep}>Next</button>
      {#if editing}
        <button
          on:click={() => {
            step = 6;
            editing = false;
          }}>Done Editing</button
        >
      {/if}
    </div>
  {:else if step === 1}
    <div in:fade={{ duration: 300 }}>
      Hi there {name},👋 can I get your email?:
      <input type="email" bind:value={email} />
      <button on:click={nextStep}>Next</button>
      {#if editing}
        <button
          on:click={() => {
            step = 6;
            editing = false;
          }}>Done Editing</button
        >
      {/if}
    </div>
  {:else if step === 2}
    <div in:fade={{ duration: 300 }}>
      Thanks, {name}. We will use {email} to contact you! What's your domain?
      <input type="text" bind:value={domain} />
      <button on:click={nextStep}>Next</button>
      {#if editing}
        <button
          on:click={() => {
            step = 6;
            editing = false;
          }}>Done Editing</button
        >
      {/if}
    </div>
  {:else if step === 3}
    <div in:fade={{ duration: 300 }}>
      Great! What's the subject of your message?
      <input type="text" bind:value={subject} />
      <button on:click={nextStep}>Next</button>
      {#if editing}
        <button
          on:click={() => {
            step = 6;
            editing = false;
          }}>Done Editing</button
        >
      {/if}
    </div>
  {:else if step === 4}
    <div in:fade={{ duration: 300 }}>
      So this is about {subject} Could you provide more details in a message, {name}?
      <textarea bind:value={message} />
      <button on:click={nextStep}>Next</button>
      {#if editing}
        <button
          on:click={() => {
            step = 6;
            editing = false;
          }}>Done Editing</button
        >
      {/if}
    </div>
  {:else if step === 5}
    <div in:fade={{ duration: 300 }}>
      Would you like to upload a file?
      <input type="file" on:change={handleFileChange} />
      <button on:click={() => nextStep(true)}>Skip</button>
      {#if editing}
        <button
          on:click={() => {
            step = 6;
            editing = false;
          }}>Done Editing</button
        >
      {/if}
    </div>
  {:else if step === 6}
    <div in:fade={{ duration: 300 }}>
      Does everything look good?:
      <ul>
        <li>
          <div class="review-box">
            <strong>Name:</strong>
            {name}
            <button on:click={() => goToStep(0)}>Edit</button>
          </div>
        </li>
        <li>
          <div class="review-box">
            <strong>Email:</strong>
            {email}
            <button on:click={() => goToStep(1)}>Edit</button>
          </div>
        </li>
        <li>
          <div class="review-box">
            <strong>Domain:</strong>
            {domain}
            <button on:click={() => goToStep(2)}>Edit</button>
          </div>
        </li>
        <li>
          <div class="review-box">
            <strong>Subject:</strong>
            {subject}
            <button on:click={() => goToStep(3)}>Edit</button>
          </div>
        </li>
        <li>
          <div class="review-box">
            <strong>Message:</strong>
            {message}
            <button on:click={() => goToStep(4)}>Edit</button>
          </div>
        </li>
        {#if file}
          <li>
            <div class="review-box">
              <strong>File:</strong>
              {file.name}
              <button on:click={() => goToStep(5)}>Edit</button>
            </div>
          </li>
        {/if}
      </ul>
      <button type="submit">Submit</button>
    </div>
  {:else}
    <div>
      Thank you, {name}! Your information has been submitted and we will get
      back to you ASAP regarding your query about {subject}
      <!-- You can add the logic to send the form data to the server here. -->
    </div>
  {/if}
</form>

<style>
  div {
    border: 2px solid #000;
    padding: 20px;
    margin: 10px 0;
    box-sizing: border-box;
  }

  /* Text input fields and text area */
  input[type="text"],
  input[type="email"],
  textarea,
  input[type="file"] {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 2px solid #000;
    background-color: #fff;
    margin-top: 10px;
  }

  /* Button styles */
  button {
    padding: 10px 20px;
    border: 2px solid #000;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }

  /* Hover effect for buttons */
  button:hover {
    background-color: #f1f1f1;
  }

  /* Labels and textual content */
  .review-box {
    border: 2px solid #000;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
