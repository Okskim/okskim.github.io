window.addEventListener('DOMContentLoaded',() => {
const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      itemMenu = document.querySelectorAll('.menu_item');

      

    hamburger.addEventListener('click', () => {        
        
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
       
    });   
    
    itemMenu.forEach(item => {
        item.addEventListener('click', () => {           
            
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });

    });

//btn phone

const phone = document.querySelector('.subheader_btn'),
      overlay = document.querySelector('.overlay'),     
      consultation =document.querySelector('#consultation'),
      order = document.querySelector('.promo_btn'), 
      label = document.querySelector('.label'),
      title = document.querySelector('.title'),         
      orderForm = document.querySelector('#order');

 
function openModal(modal) {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    label.classList.toggle('label_hide');
    title.classList.toggle('label_hide');
}

function hideModal(modal) {
    modal.style.display ='none';
    overlay.style.display ='none';
    label.classList.toggle('label_hide');
    title.classList.toggle('label_hide');
}


phone.addEventListener('click', (e) => {
    openModal(consultation);
});
order.addEventListener('click', (e) => {
    openModal(orderForm);
});


function closeModal(modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.matches('.modal_close')) {
           hideModal(modal);
        }     
   }); 
   closeEsc(modal);
}

function closeEsc (modal) { 
document.body.addEventListener('keydown', (e) => {
    if(e.code === "Escape") {
           hideModal(modal);
        }
    });
}

closeModal(orderForm);
closeModal(consultation);
  

//forms
const forms = document.querySelectorAll('form');

const message = {   
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindPostData(item);
});

function bindPostData(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method:"POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body:data
            });
            return await res.json();        
        };

        postData('http://localhost:3000/posts', json)
        . then(data =>{
            console.log(data);           
            showThanksModal(message.success);            
        }).catch(() =>{           
            showThanksModal(message.failure);

        }).finally(() => {
            form.reset();
        }); 
    });
}

function showThanksModal(message) {
    const prewModal = document.querySelector('#thanks');
      
    consultation.style.display ='none';
    orderForm.style.display ='none';
    label.classList.toggle('label_hide');
    title.classList.toggle('label_hide');
    
    openModal(prewModal);    

     prewModal.innerHTML = `        
        <div class="modal_descr">${message}</div>            
    </div>
     `;  

    setTimeout(() => {
        hideModal(prewModal);
     },2000);
}

});    

