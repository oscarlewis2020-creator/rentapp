const payoutForm = document.getElementById("payoutForm") as HTMLFormElement;

if (payoutForm) {
  payoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const organizationId = (
      document.getElementById("organizationId") as HTMLInputElement
    ).value;

    const recipientAccount = (
      document.getElementById("recipientAccount") as HTMLInputElement
    ).value;

    const recipientName = (
      document.getElementById("recipientName") as HTMLInputElement
    ).value;

    const amount = (document.getElementById("amount") as HTMLInputElement)
      .value;

    const currency = (document.getElementById("currency") as HTMLSelectElement)
      .value;

    const recipientData = {
      organizationId,
      amount,
      currency,
      recipientAccount,
      recipientName,
    };

    try {
      const response = await fetch("http://localhost:3000/api/send-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(recipientData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Success!");
        payoutForm.reset();
      } else {
        alert("Transfer Failed");
      }
    } catch (error) {
      console.log(error);
    }
  });
}
