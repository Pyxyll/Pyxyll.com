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
  let status = "";

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

  const handleSubmit = async (data) => {
    status = "Submitting...";
    const formData = new FormData(data.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
      status = result.message || "Success";
    }
  };
</script>

<div class="formWrapper">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="hidden"
      name="access_key"
      value="ce96f656-987d-4f11-9b93-1722f9b23de1"
    />
    {#if step === 0}
      <div in:fade={{ duration: 300 }}>
        <label for="name"
          >Howdy Stranger, Let's get acquainted, What's your name?</label
        >
        <input
          bind:value={name}
          name="name"
          type="text"
          placeholder="Your answer here.."
          required="true"
        />
        <button class="nextBtn" type="button" on:click={nextStep}
          >Next <img
            class="arrow"
            src="images/UI/arrow-down-right.svg"
            alt=""
          /></button
        >
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
        <input
          type="email"
          bind:value={email}
          name="email"
          placeholder="Your answer here.."
          required="true"
        />
        <button class="nextBtn" type="button" on:click={nextStep}
          >Next <img
            class="arrow"
            src="images/UI/arrow-down-right.svg"
            alt=""
          /></button
        >
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
        Thanks, {name}. I will use {email} to contact you! What's your domain?
        <input
          type="text"
          bind:value={domain}
          name="domain"
          placeholder="Your answer here.."
          required="true"
        />
        <button class="nextBtn" type="button" on:click={nextStep}
          >Next <img
            class="arrow"
            src="images/UI/arrow-down-right.svg"
            alt=""
          /></button
        >
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
        <input
          type="text"
          bind:value={subject}
          name="subject"
          placeholder="Your answer here.."
          required="true"
        />
        <button class="nextBtn" type="button" on:click={nextStep}
          >Next <img
            class="arrow"
            src="images/UI/arrow-down-right.svg"
            alt=""
          /></button
        >
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
        So this is about {subject} Could you provide more details?
        <textarea
          bind:value={message}
          name="message"
          placeholder="Your answer here.."
          required="true"
        />
        <button class="nextBtn" type="button" on:click={nextStep}
          >Next <img
            class="arrow"
            src="images/UI/arrow-down-right.svg"
            alt=""
          /></button
        >
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
        If you have any additional information you can upload it here!
        <input type="file" on:change={handleFileChange} name="file" />
        <button type="button" on:click={() => nextStep(true)}>Skip</button>
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
              <button class="edit" on:click={() => goToStep(0)}>
                <img class="arrow" src="images/UI/edit.svg" alt="" /></button
              >
            </div>
          </li>
          <li>
            <div class="review-box">
              <strong>Email:</strong>
              {email}
              <button class="edit" on:click={() => goToStep(1)}>
                <img class="arrow" src="images/UI/edit.svg" alt="" /></button
              >
            </div>
          </li>
          <li>
            <div class="review-box">
              <strong>Domain:</strong>
              {domain}
              <button class="edit" on:click={() => goToStep(2)}>
                <img class="arrow" src="images/UI/edit.svg" alt="" /></button
              >
            </div>
          </li>
          <li>
            <div class="review-box">
              <strong>Subject:</strong>
              {subject}
              <button class="edit" on:click={() => goToStep(3)}>
                <img class="arrow" src="images/UI/edit.svg" alt="" /></button
              >
            </div>
          </li>
          <li>
            <div class="review-box">
              <strong>Message:</strong>
              {message}
              <button class="edit" on:click={() => goToStep(4)}>
                <img class="arrow" src="images/UI/edit.svg" alt="" /></button
              >
            </div>
          </li>
          {#if file}
            <li>
              <div class="review-box">
                <strong>File:</strong>
                {file.name}
                <button class="edit" on:click={() => goToStep(5)}>
                  <img class="arrow" src="images/UI/edit.svg" alt="" /></button
                >
              </div>
            </li>
          {/if}
        </ul>
        <input type="hidden" name="name" bind:value={name} />
        <input type="hidden" name="email" bind:value={email} />
        <input type="hidden" name="domain" bind:value={domain} />
        <input type="hidden" name="subject" bind:value={subject} />
        <input type="hidden" name="message" bind:value={message} />
        <input type="submit" />
      </div>
    {:else}
      <div>
        {status}
      </div>
    {/if}
  </form>
</div>

<style>
  .edit {
    border: none;
    height: 20px;
    width: 20px;
  }
  .formWrapper {
    font-size: 1.5em;
    padding: 20px;
    margin: 10em 10em;
  }
  label {
    display: block;
  }

  input,
  textarea {
    margin: 1em auto;
    width: 100%;
    height: auto;
    font-size: 2em;
    background-color: var(--white);
    border: none;
    outline: none;
    border-bottom: 2px solid #000;
  }

  /* Text input fields and text area */
  /* input[type="text"],
  input[type="email"],
  textarea,
  input[type="file"] {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 2px solid #000;
    background-color: #fff;
    margin-top: 10px;
  } */

  /* Button styles */
  .nextBtn,
  input[type="submit"],
  input[type="file"] {
    padding: 10px 20px;
    border: 2px solid #000;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }

  /* Hover effect for buttons */
  /* button:hover,
  input[type="submit"]:hover {
    background-color: #f1f1f1;
  } */

  /* Labels and textual content */
  /* .review-box {
    border: 2px solid #000;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */

  .nextBtn {
    top: 0;
    left: 0;
    transition: all 0.15s linear 0s;
    position: relative;
    display: inline-block;
    padding: 15px 25px;
    background-color: white;
    text-transform: uppercase;
    color: black;
    letter-spacing: 1px;
    box-shadow: 6px 6px 0 black;
    text-decoration: none;
    border-style: solid;
  }
  .nextBtn:hover {
    top: 3px;
    left: 3px;
    box-shadow: 3px 3px 0 black;
  }
  .arrow {
    width: 15px;
    padding: 0px 0px 0px 10px;
    transition: 0.3s;
  }

  .nextBtn:hover .arrow {
    transform: rotate(-45deg) translateX(5px) translateY(3px);
    transition: 0.3s;
    padding: 0px 20px 0px 15px;
  }
  .nextBtn:hover::after {
    top: 1px;
    left: 2px;
    width: 4px;
    height: 4px;
  }
  .nextBtn:hover::before {
    bottom: 2px;
    right: 1px;
    width: 4px;
    height: 4px;
  }
  .nextBtn::after {
    transition: all 0.15s linear 0s;
    content: "";
    position: absolute;
    top: 2px;
    left: 4px;
    width: 8px;
    height: 8px;
    background-color: black;
    transform: rotate(45deg);
    z-index: -1;
  }
  .nextBtn::before {
    transition: all 0.15s linear 0s;
    content: "";
    position: absolute;
    bottom: 4px;
    right: 2px;
    width: 8px;
    height: 8px;
    background-color: black;
    transform: rotate(45deg);
    z-index: -1;
  }
</style>
