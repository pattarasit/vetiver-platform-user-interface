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

            <div class="row colors">
                <div class="col-sm mar-img"><img class="img-fluid" src="../../assets/images/farm2.jpg"></div>
                <div class="color-div col-sm">
                    <h1>เกษตรก้าวหน้า</h1>
                    <p>อนาคตประเทศไทย ...เมืองอู่ข้าวอู่น้ำจะต้องดำรงคงอยู่ต่อไป วันนี้ เราอยู่นิ่งไม่ได้...เราไม่เปลี่ยนแต่โลกเปลี่ยน เราจะถูกบังคับให้เปลี่ยนด้วยเทคโนโลยีสมัยใหม่ที่จะเข้ามา เราเปลี่ยนตั้งแต่วันนี้...ทำตั้งแต่วันนี้ เพื่อเตรียมตัวรองรับสิ่งที่จะเกิดขึ้นในวันข้างหน้าให้เร็วขึ้นดีขึ้น มีความมั่นคงมากขึ้น</p>
                </div>

            </div>

        </main>

        <footer class="mastfoot mt-auto">
            <nav class="mt-2">
                <a href="http://fb.me/vetiverTH" target="_blank">Facebook</a> |
                <a href="http://m.me/vetiverTH" target="_blank">Masseger</a>
            </nav>
            <div class="inner">
                <p>©{{this.years}} เกษตรก้าวหน้า</p>
            </div>
        </footer>

    </div>
</div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");

a,
a:focus,
a:hover {
    color: #fff;
}

/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
    color: #333;
    text-shadow: none;
    background-color: rgb(45, 206, 125);
    border: 0.05rem solid #fff;
}

/*
 * Base structure
 */

html,
body {
    font-family: "Sarabun", sans-serif;
    height: 100%;
    background-image: url("../../assets/images/bg_rgb.png");
    background-size: cover;
}

body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    justify-content: center;
    color: #fff;
    text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
    /* box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5); */
}

.cover-container {
    max-width: 80em;
}

/*
 * Header
 */
.masthead {
    margin-bottom: 2rem;
}

.masthead-brand {
    margin-bottom: 0;
}

.nav-masthead .nav-link {
    padding: 0.25rem 0;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    background-color: transparent;
    border-bottom: 0.25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
    border-bottom-color: rgba(255, 255, 255, 0.3);
}

.nav-masthead .nav-link+.nav-link {
    margin-left: 1rem;
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

/*
 * Cover
 */
.cover {
    padding: 0 1.5rem;
}

.cover .btn-lg {
    padding: 0.75rem 1.25rem;
    font-weight: 300;
    letter-spacing: 1pt;
    border-radius: 2rem;
}

/*
 * Footer
 */
.mastfoot {
    letter-spacing: 1.5pt;
    /* font-size: 6pt; */
    font-weight: 200;
    color: rgba(233, 233, 233, 0.7);
}

.bgg {
    z-index: -1;
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(71, 92, 104, 0.336);
    background-size: cover;
}

.bg {
    left: 0;
    top: 0;
    position: absolute;
    z-index: -2;
    height: 100%;
    width: 100%;
    background-image: url("../../assets/images/bg.png");
    background-size: cover;
}

.flex-responsive {
    display: flex;
    text-align: center;
}

.color-div {
    background-color: #777;
    text-align: left;
    width: 100%;
    padding-left: 2%;
    padding-top: 2%;
}

.colors {
    background-color: #777;
    padding: 0;
    margin: 3%;
    margin-bottom: 0;
}

.mar-img {
    margin: 0;
    padding: 0;
}
</style>

<script>
export default {
    name: "HomePage",
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
