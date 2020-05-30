<template>
    <div class="text-center">
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <header class="masthead mb-auto">
            <div class="inner">
                <img src="../../assets/images/logo_vetiver.png" class="masthead-brand" width="15%" />
                <nav class="nav nav-masthead justify-content-center">
                    <a class="nav-link" href="http://localhost:8080/homepage">หน้าหลัก</a>
                    <a class="nav-link" href="http://localhost:8080/aboutme">เกี่ยวกับเรา</a>
                    <a class="nav-link" href="http://localhost:8080/contact">คุยกับเรา</a>
                    <a class="nav-link" href="#">ร่วมงานกับเรา</a>
                </nav>
            </div>
        </header>

        <main>
            <div class="container contact-form">
                <div class="contact-image">
                    <img src="../../assets/images/logo1.png" />
                </div>
                <form method="post">
                    <h2>เขียนข้อความถึงฉัน</h2>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" name="txtName" class="form-control" placeholder="ชื่อ - นามสกุล *" value />
                            </div>
                            <div class="form-group">
                                <input type="text" name="txtEmail" class="form-control" placeholder="ที่อยู่อีเมล *" value />
                            </div>
                            <div class="form-group">
                                <textarea name="txtMsg" class="form-control" placeholder="ข้อความของคุณ *" style="width: 100%; height: 150px; resize: none;"></textarea>
                            </div>
                            <div class="form-group text-center">
                                <input type="submit" name="btnSubmit" class="btnContact btn-primary" value="ส่งข้อความ" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>

        <footer class="mastfoot mt-auto text-center">
            <div class="inner">
                <p>©{{this.years}} เกษตรก้าวหน้า</p>
            </div>
        </footer>
        
    </div>
</div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");

body {
    font-family: "Sarabun", sans-serif;
    height: 100%;
    width: 100%;
    background-image: url("../../assets/images/bg_rgb.png");
    background-size: cover;
}

body {
    font-family: "Sarabun", sans-serif;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    justify-content: center;
    color: #fff;
    margin: 0;
    padding: 0;
    text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
    /*box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
     background: -webkit-linear-gradient(left, #0073ff0a, #00c8ff11); */
}

.contact-form {
    background: #fff;
    margin-top: 3%;
    margin-bottom: 2%;
    width: 60%;
}

.contact-form .form-control {
    border-radius: 1rem;
}

.contact-image {
    text-align: center;
}

.contact-image img {
    border-radius: 6rem;
    width: 15%;
    margin-top: -7%;
}

.contact-form form {
    padding: 14%;
}

.contact-form form .row {
    margin-bottom: -18%;
}

.contact-form h2 {
    margin-bottom: 8%;
    margin-top: -15%;
    text-align: center;
    color: #0062cc;
}

.contact-form .btnContact {
    width: 40%;
    border: none;
    border-radius: 1rem;
    padding: 1.5%;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
}

.btnContactSubmit {
    width: 40%;
    border-radius: 1rem;
    padding: 1.5%;
    color: #fff;
    background-color: #0062cc;
    border: none;
    cursor: pointer;
}

.bg {
    left: 0;
    top: 0;
    position: absolute;
    z-index: -2;
    height: 100vmax;
    width: 100vw;
    background-image: url("../../assets/images/bg.png");
    background-size: cover;
}


.nav-masthead .nav-link {
    padding: 0.25rem 0;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    background-color: transparent;
    border-bottom: 0.3rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
    border-bottom-color: rgba(255, 255, 255, 0.3);
}

.nav-masthead .nav-link+.nav-link {
    margin-left: 1rem;
}

.masthead-brand {
    margin-bottom: 0;
}

.masthead {
    margin-bottom: 2rem;
}
.nav-masthead .active {
    color: #fff;
    border-bottom-color: #fff;
}

@media (min-width: 48em) {
    .masthead-brand {
        float: left;
    }

    .nav-masthead {
        float: right;
    }
}

.cover-container {
    max-width: 80em;
}

.mastfoot {
    letter-spacing: 1.5pt;
    font-weight: 200;
    color: rgba(233, 233, 233, 0.7);
}

</style>

<script>
export default {
    name: "Contact",
    data() {
        return {
            years: null
        };
    },
    methods: {
        getYears() {
            var date = new Date();
            this.years = date.getFullYear();
        }
    },
    mounted() {
        this.getYears();
    }
};
</script>
