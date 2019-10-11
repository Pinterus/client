// import Vue from 'vue'
// import App from 'vue'
// import Navbar from './src/navbar.vue'

// // new Vue(App).$mount('#app')

// Vue.component('test',App)
// Vue.component('navbar',Navbar)

new Vue({
  // render : h=> h(Navbar),
  el: '#app',
  data: {
    images: [],
    file : '',
    usernamereg:'',
    emailreg:'',
    passwordreg:'',
    emaillog:'',
    passwordlog:'',
    nama:'',
    fileName : '',
    url : [],
    eachUrl : '',
    on : false,
    home : false,
    onregister : false,
    onlogin : true
  },
  // components : {Navbar},
  methods: {
    searchImage: function() {
      axios({
        method: 'get',
        url: ' http://localhost:3000/search?keyword='+this.keyword
      })
        .then(({data}) => {
          this.images = data
        })
    },
    fetchImage: function () {
      axios({
        method: 'get',
        url: ' http://localhost:3000/random'
      })
        .then(({data}) => {
          this.images = data
          // console.log(this.images[0].urls.full)
          // console.log(this.images[0].alt_description)
        })
    },
    submitFile(){
      let formData = new FormData();
      formData.append('image',this.file)
      console.log(formData);
      console.log(this.file,'atas');
      axios({
        method : 'post',
        url :  'http://localhost:3000/upload',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
       .then((data)=>{
         console.log(data);
         this.url.push(data.data.link)
         this.on = true
         console.log(this.url)
       })
       .catch((err)=>{
         console.log(err);
       })
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0]
      this.fileName = this.file.name
      console.log(this.file,'bawah');
    },
    register(){
      console.log('masuk method erasda--------_>>>')
      axios({
          method: "post",
          url: "http://localhost:3000/register",
          data:{
              username: this.usernamereg,
              email: this.emailreg,
              password: this.passwordreg
          }
      })
          .then(({data}) => {
            let timerInterval
            Swal.fire({
              title: 'Logging In!',
              timer: 800,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  Swal.getContent().querySelector('strong')
                    .textContent = Swal.getTimerLeft()
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              localStorage.setItem('token', data.token)
              localStorage.setItem('username', data.username)
              this.nama = data.username
              this.usernamereg = ''
              this.emailreg = ''
              this.passwordreg = ''
              this.onregister = false
              this.isLogin()
            })
          })
          .catch(err => {
            // console.log(err);
            // this.errorregister = JSON.parse(err.response.request.response).message[0]                    
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: JSON.parse(err.response.request.response).message[0]
            })
          })
  },
  login(){
      axios({
          method: "post",
          url: "http://localhost:3000/login",
          data:{
              email: this.emaillog,
              password: this.passwordlog
          }
      })
          .then(({data}) => {
            let timerInterval
            Swal.fire({
              title: 'Logging In!',
              timer: 800,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  Swal.getContent().querySelector('strong')
                    .textContent = Swal.getTimerLeft()
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              localStorage.setItem('token', data.token)
              localStorage.setItem('username', data.username)
              this.nama = data.username
              this.emaillog = ''
              this.passwordlog = ''
              this.isLogin()
            })
          })
          .catch(err => {
            // this.errorlogin = JSON.parse(err.response.request.response).message[0]
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: JSON.parse(err.response.request.response).message[0]
            })  
          })
  },
  signout(){
    let timerInterval
      Swal.fire({
        title: 'Thanks!',
        timer: 800,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector('strong')
              .textContent = Swal.getTimerLeft()
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.isLogin()
        this.nama = ''
      })
    
  },
  isLogin(){
    if(localStorage.getItem('token')){
      this.home = true
    } else {
      this.home = false
    }
  },
  formRegister(){
    this.onregister = true;
    this.onlogin = false;
  }
  },
  computed: {
    
  },
  watch: {
    home(){
      this.usernamereg = ''
      this.emailreg = ''
      this.passwordreg = ''
      this.emaillog = ''
      this.passwordlog = ''
    }
  },
  created() {
    // this.fetchImage()
    this.isLogin()
  }
})

// // Gallery image hover
// $( ".img-wrapper" ).hover(
//   function() {
//     $(this).find(".img-overlay").animate({opacity: 1}, 300);
//   }, function() {
//     $(this).find(".img-overlay").animate({opacity: 0}, 300);
//   }
// );

// // Lightbox
// var $overlay = $('<div id="overlay"></div>');
// var $image = $("<img>");
// var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
// var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
// var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

// // Add overlay
// $overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
// $("#gallery").append($overlay);

// // Hide overlay on default
// $overlay.hide();

// // When an image is clicked
// $(".img-overlay").click(function(event) {
//   // Prevents default behavior
//   event.preventDefault();
//   // Adds href attribute to variable
//   var imageLocation = $(this).prev().attr("href");
//   // Add the image src to $image
//   $image.attr("src", imageLocation);
//   // Fade in the overlay
//   $overlay.fadeIn("slow");
// });

// // When the overlay is clicked
// $overlay.click(function() {
//   // Fade out the overlay
//   $(this).fadeOut("slow");
// });

// // When next button is clicked
// $nextButton.click(function(event) {
//   // Hide the current image
//   $("#overlay img").hide();
//   // Overlay image location
//   var $currentImgSrc = $("#overlay img").attr("src");
//   // Image with matching location of the overlay image
//   var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
//   // Finds the next image
//   var $nextImg = $($currentImg.closest(".image").next().find("img"));
//   // All of the images in the gallery
//   var $images = $("#image-gallery img");
//   // If there is a next image
//   if ($nextImg.length > 0) { 
//     // Fade in the next image
//     $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
//   } else {
//     // Otherwise fade in the first image
//     $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
//   }
//   // Prevents overlay from being hidden
//   event.stopPropagation();
// });

// // When previous button is clicked
// $prevButton.click(function(event) {
//   // Hide the current image
//   $("#overlay img").hide();
//   // Overlay image location
//   var $currentImgSrc = $("#overlay img").attr("src");
//   // Image with matching location of the overlay image
//   var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
//   // Finds the next image
//   var $nextImg = $($currentImg.closest(".image").prev().find("img"));
//   // Fade in the next image
//   $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
//   // Prevents overlay from being hidden
//   event.stopPropagation();
// });

// // When the exit button is clicked
// $exitButton.click(function() {
//   // Fade out the overlay
//   $("#overlay").fadeOut("slow");
// });
