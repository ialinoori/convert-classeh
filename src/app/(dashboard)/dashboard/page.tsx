import React from "react";

const data = [
  {
    id: 1,
    title: "تکالیف",
    img: "/images/ax.png",
  },
  {
    id: 1,
    title: "پیام رسان",
    img: "/images/messenger.png",
  },
  // {
  //   id: 1,
  //   title: "پیام رسان قدیمی",
  //   img: "/images/old-messenger.png",
  // },
  {
    id: 1,
    title: "بازی ها  ",
    img: "/images/games.png",
  },

  {
    id: 1,
    title: " بازی های آموزشی  ",
    img: "/images/edu-games.png",
  },

  {
    id: 1,
    title: "   دانستنی ها  ",
    img: "/images/danestani.png",
  },

  {
    id: 1,
    title: "    مدیریت کلاس ها  ",
    img: "/images/class-managment.png",
  },
  {
    id: 1,
    title: "      نظر سنجی  ",
    img: "/images/survey.png",
  },

  {
    id: 1,
    title: "       وبینار کلاسه  ",
    img: "/images/webinar.png",
  },

  {
    id: 1,
    title: "        وبینار های دیگر  ",
    img: "/images/webinar.png",
  },

  {
    id: 1,
    title: "          پرداخت های انلاین  ",
    img: "/images/online-payment.png",
  },
  {
    id: 1,
    title: "            بانک سوالات  ",
    img: "/images/questions-bank.png",
  },
  {
    id: 1,
    title: "            ایجا آزمون   ",
    img: "/images/survey.png",
  },

  {
    id: 1,
    title: "            برنامه هفتگی    ",
    img: "/images/plan.png",
  },
  {
    id: 1,
    title: "            آزمایشگاه دبستان     ",
    img: "/images/librator.png",
  },

  {
    id: 1,
    title: "            آزمایشگاه متوسطه اول     ",
    img: "/images/librator.png",
  },

  {
    id: 1,
    title: "            آزمایشگاه متوسطه دوم     ",
    img: "/images/librator.png",
  },

  
  {
    id: 1,
    title: "              محتوای آموزشی     ",
    img: "/images/edu-content.png",
  },
];

const page = () => {
  return (
    <div className="grid gap-8 max-w-[75rem] mx-auto my-4 grid-cols-5">
      {data.map((item) => (
        <div className="bg-white shadow-md  rounded-[10px]">
          <div className="p-[16px]">
            <img src={item.img} />
          </div>
          <div className="bg-[#0a4471] rounded-b-[10px] py-[12px]">
            <p className="text-center text-white">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
