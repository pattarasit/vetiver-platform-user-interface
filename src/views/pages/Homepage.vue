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

        <main role="main" class="inner cover">
            <h1 class="cover-heading" style="font-size: 48pt">เกษตรก้าวหน้า</h1>
            <h6 class="mt-5 mb-0">การจะพัฒนาทุกสิ่งทุกอย่างให้เจริญนั้น จะต้องสร้างและเสริมขึ้นจากพื้นฐานเดิมที่มีอยู่ก่อนทั้งสิ้น</h6>
            <br />
            <h4 class="mt-0 mb-0">ถ้าพื้นฐานไม่ดีหรือคลอนแคลนบกพร่องแล้ว การที่จะเพิ่มเติมเสริมต่อให้เจริญขึ้นไปอีกนั้นเป็นเรื่องยาก</h4>
            <br />
            <h6 class="mt-0">จึงควรจะเข้าใจให้แจ้งชัดว่า นอกจากจะมุ่งสร้างความเจริญแล้ว ยังต้องพยายามรักษาพื้นฐานให้มั่นคง ไม่บกพร่อง พร้อม ๆ กันได้</h6>
            <p class="lead mt-5">
                <a href="http://localhost:8080/login" class="btn btn-lg btn-primary">เข้าใช้งาน</a>
            </p>
        </main>

        <footer class="mastfoot mt-auto">
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
    width: 100%;
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
