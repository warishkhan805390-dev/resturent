const posts = [
  { tag: "Food & Health", title: "Healthy Fast Food: A Myth or Beautiful Reality", author: "James Writer", comments: 24, img: "/img/blog/1.jpg", day: "14", month: "Mar" },
  { tag: "Food Science", title: "Is Fast Food Getting Healthier? Here's What We Found", author: "Sarah Grain", comments: 18, img: "/img/blog/2.jpg", day: "28", month: "Feb" },
  { tag: "Recipes", title: "Innovative Hot Chickpeas Flake Crackin' Recipe at Home", author: "Chef Marcus", comments: 32, img: "/img/blog/3.jpg", day: "05", month: "Jan" },
];

export default function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl">News & Updates</span>
          <h2 className="stitle">Our Latest <span>Blog</span> Posts</h2>
          <div className="sline"></div>
        </div>
        <div className="row g-4">
          {posts.map((p, i) => (
            <div className="col-md-6 col-lg-4" key={p.title} data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="blcard">
                <div className="blimg">
                  <img src={p.img} alt="" />
                  <div className="bldatebdg"><span className="bd">{p.day}</span><span className="bm">{p.month}</span></div>
                </div>
                <div className="blbody">
                  <div className="bltag">{p.tag}</div>
                  <div className="bltit"><a href="#">{p.title}</a></div>
                  <div className="blmeta">
                    <span><i className="fas fa-user"></i>{p.author}</span>
                    <span><i className="fas fa-comment"></i>{p.comments} Comments</span>
                  </div>
                  <a href="#" className="blmore">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
