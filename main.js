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
    geturl: [],
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
  },
  alldata(){
    axios({
      method: "get",
      url: "http://localhost:3000/getall"
    })
      .then(data => {
        for( let i = 0; i< data.data.length; i++){
          this.geturl.push(data.data[i].location)
        }
      })
      .catch(err => {
        console.log(err);
      })
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
    this.alldata()
  }
})
