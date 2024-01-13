
const Contact = () => {
  return (
    <div className="contact container pt-6 mx-auto px-4 flex flex-wrap justify-center gap-6">
      <div className="call-us shadow-md rounded-md p-6">
        <div className="call-to-us flex flex-col gap-4 pb-5 border-b">
          <div className="flex flex-row items-center gap-3">
            <img src="/imgs/call-to-us.svg" alt="img" />
            <p className="font-inter font-medium text-[19px]">Call To Us</p>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: <span className="text-button2 font-medium font-inter">+20 155 691 5374</span></p>
        </div>

        <div className="write-to-us flex flex-col gap-4 pt-5">
          <div className="flex flex-row items-center gap-3">
            <img src="/imgs/write-to-us.svg" alt="img" />
            <p className="font-inter font-medium text-[19px]">Write To US</p>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Email: <span className="text-button2 font-medium font-inter">momenelnager@gmail.com</span></p>
        </div>
      </div>

      <div className="form w-full md:w-fit shadow-md rounded-md p-6">
        <form action="#">
          <div className="flex gap-3 flex-col md:flex-row">
            <input className="bg-secondary rounded p-3" type="text" name="nameField" placeholder="Your Name" />
            <input className="bg-secondary rounded p-3" type="text" name="emailField" placeholder="Your email" />
            <input className="bg-secondary rounded p-3" type="text" name="phoneField" placeholder="Your Phone" />
          </div>

          <textarea className="bg-secondary rounded outline-none mt-4 p-3 w-full h-[200px] resize-none" name="message" placeholder="Your Massage"></textarea>

          <div className="text-right"><button type="button" className="bg-button2 mt-2 text-white rounded-md py-3 px-4">Send Massage</button></div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
