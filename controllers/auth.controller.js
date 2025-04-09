const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");
const Seller = require("../models/seller");
const Customer = require("../models/customer");
const Otp = require("../models/otp");

const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const config = require("config");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../services/sendEmail.service");

const registration = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone_number,
      address,
      password,
      passport_id,
      role,
    } = req.body;
const userotp = req.body.otp;





    if (role !== "seller" && role !== "customer") {
      return res
        .status(400)
        .json({
          message:
            "Faqat 'customer' yoki 'seller' roli bilan royxatdan otish mumkin",
        });
    }

//otp
const otp = await Otp.findOne({ where: { email } });

console.log("Body:", req.body);
console.log("Email:", email);
console.log("OTP bazadan:", otp);



if (!otp) {
  console.log(otp);
  return res.status(400).json({ message: "OTP topilmadi" });
}
if (otp.code !== userotp) {
  console.log(otp.code);

  return res.status(400).json({ message: "Notogri OTP" });
}
if (otp.expiresAt < new Date()) {
  return res.status(400).json({ message: "OTP muddati o'tgan" });
}
await Otp.destroy({ where: { email } });
console.log("OTP togri kiritildi");

//--------
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === "customer") {
      newUser = await Customer.create({
        full_name,
        email,
        phone_number,
        address,
        password: hashedPassword,
        passport_id,
      });
    } else if (role === "seller") {
      const company_id = req.body.company_id;
      newUser = await Seller.create({
        full_name,
        email,
        phone_number,
        address,
        password: hashedPassword,
        passport_id,
        company_id
      });
    }

    logger.info(`${role} muvaffaqiyatli registratsiya boldi!: ${newUser.id}`);
    res
      .status(201)
      .json({
        message: `${role} muvaffaqiyatli ro'yxatdan o'tdi`,
        data: newUser,
      });
  } catch (error) {
    logger.error(`Ro'yxatdan o'tishda xatolik: ${error.message}`);
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};


//---- refresh tokenlar uchun ----//



const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.user;
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token yuborilmadi" });
    }

    const decoded = jwt.verify(refreshToken, config.get("jwt_refresh_secret"));
    let user;
    

    if (decoded.role === "admin") {
      user = await Admin.findByPk(decoded.id);
    } else if (decoded.role === "seller") {
      user = await Seller.findByPk(decoded.id);
    } else if (decoded.role === "customer") {
      user = await Customer.findByPk(decoded.id);
    }
    else if (decoded.role === "creator") {
      user = await Admin.findByPk(decoded.id);}

      
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token noto'g'ri yoki muddati o'tgan" });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      config.get("jwt_secret"),
      { expiresIn: "10h" } 
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};


//-----------------------------//
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;
    if (role === "admin") {
      user = await Admin.findOne({ where: { email } });
    } else if (role === "seller") {
      user = await Seller.findOne({ where: { email } });
    } else if (role === "customer") {
      user = await Customer.findOne({ where: { email } });
    }
    else if (role === "creator") {
      user = await Admin.findOne({ where: { email } });}



      
    if (!user) {
console.log("User not found👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻 ");
    }
    console.log(user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Noto'g'ri parol" });
    }




    console.log(user);
    
  const accessToken = jwt.sign(
    { id: user.id, role: req.body.role },
    config.get("jwt_secret"),
    { expiresIn: "10h" } 
  );

  const refreshToken = jwt.sign(
    { id: user.id, role: req.body.role },
    config.get("jwt_refresh_secret"),
    { expiresIn: "7d" }
  );


  await user.update({ refreshToken });
  await user.save();


    await user.update({ accessToken });
    await user.save();
  

    logger.info(`Foydalanuvchi tizimga kirdi: ${user.id}`);
    logger.info(`Foydalanuvchi roli: ${user.role}`);


    res.status(200).json({ message: "kirdi!!", acces: accessToken, refresh: refreshToken});
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
};


const sendOtpToUser = async (req, res) => {
  try {
    const { email } = req.body;
    const code = uuidv4().slice(0, 6).toUpperCase();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

    await Otp.destroy({
      where: { email },
    });
    await Otp.create({ email, code, expiresAt });

    await sendEmail(
      email,
      "Tasdiqlash kodi",
      `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avia Ijara Tasdiqlash Kodingiz</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f1f1f1;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #333;
        }
        .email-container {
            width: 100%;
            max-width: 650px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }
        .header {
            background-color: #1a73e8;
            color: white;
            padding: 15px;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 30px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        .content h2 {
            color: #FF5733;
            font-size: 26px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 10px;
        }
        .code {
            font-size: 40px;
            font-weight: bold;
            color: #FF5733;
            margin: 20px 0;
        }
        .footer {
            background-color: #f8f8f8;
            color: #888;
            padding: 10px;
            font-size: 14px;
            border-radius: 0 0 10px 10px;
        }
        .footer a {
            color: #1a73e8;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .cta-btn {
            background-color: #1a73e8;
            color: white;
            padding: 15px 25px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
        .cta-btn:hover {
            background-color: #0d5ab7;
        }
    </style>
</head>
<body>

<div class="email-container">
    <div class="header">
        <h1>Avia Ijara - Tasdiqlash Kodingiz</h1>
    </div>

    <div class="content">
        <h2>Sizning Ijara Kodingiz:</h2>
        <div class="code">${code}</div>
        <p>Bu kodni 5 daqiqa ichida foydalanishingiz kerak. Agar kodni ishlata olmasangiz, iltimos, biz bilan bog'laning!</p>
        
        <p>Biz, <strong>Avia Ijara</strong>, dunyo bo'ylab avia transporti xizmatlarini taqdim etamiz. Sizning safaringizni yanada qulayroq qilish uchun eng yaxshi ijaralar takliflarini taqdim etamiz. Har doim yuqori sifat va ishonchlilikni ta'minlashga intilamiz!</p>
        
        <p><a href="mailto:support@aviaijara.com" class="cta-btn">Yordam uchun bog'laning</a></p>
    </div>

    <div class="footer">
        <p>Avia Ijara kompaniyasi</p>
        <p>Biz bilan aloqaga o'tish uchun: <a href="mailto:support@aviaijara.com">support@aviaijara.com</a></p>
    </div>
</div>

</body>
</html>
`
    );

    logger.info(`Tasdiqlash kodi yuborildi: ${email}, Kod: ${code}`);
    
    return res.status(200).json({ message: "OTP yuborildi" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Xatolik yuz berdi" });
  }
};




const logout = async (req, res) => {
  try {
    const userId = req.user.id; // req.userdan id olish

    console.log(req.user.role);

    console.log(userId);
    
    
    let user;
    if (req.user.role === "admin") {
      user = await Admin.findByPk(userId);
    } else if (req.user.role === "seller") {
      user = await Seller.findByPk(userId);
    } else if (req.user.role === "customer") {
      user = await Customer.findByPk(userId);
    } else if (req.user.role === "creator") {
      user = await Admin.findByPk(req.user.id);
    }

    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    await user.update({ accessToken: null });
    await user.save();
    await user.update({ refreshToken: null });
    await user.save();

    logger.info(`Foydalanuvchi tizimdan chiqdi: ${userId}`);

    res.status(200).json({ message: "Tizimdan chiqish muvaffaqiyatli" });
  } catch (error) {
    console.error(error);
errorHandler(error, req, res);
  }
};


//-----------------------------//
const editpassword = async (req, res) => {
  try {
    const { email, password,newPassword,passNewPassword } = req.body;
    let user;
    if (req.user.role === "admin") {
      user = await Admin.findOne({ where: { email } });
    } else if (req.user.role === "seller") {
      user = await Seller.findOne({ where: { email } });
    } else if (req.user.role === "customer") {
      user = await Customer.findOne({ where: { email } });
    } else if (req.user.role === "creator") {
      user = await Admin.findOne({ where: { email } });
    }
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

  console.log(user.full_name ,user.email,user.role);
  console.log(`user:password👨‍💻 :${user.password}`);
  console.log(password);
  
  
  const isMatch = await bcrypt.compare(password,user.password)
  if(!isMatch){
    return res.status(401).send({message:"HATO! parol yoki email notog'ri"})
  }
  console.log(user.password);
      
    if(newPassword !== passNewPassword){
      return res.status(400).json("HATO PASS PASSWORD")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: "Parol o'zgartirildi" });
  } catch (error) {
    logger.error(`Error updating password: ${error.message}`);
    errorHandler(error, req, res);
  }
}


module.exports = { login, logout,refreshToken,sendOtpToUser,editpassword,registration };
