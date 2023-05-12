using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FinalContext db;
        private readonly IConfiguration _config;

        public UserController(FinalContext _db, IConfiguration cf)
        {
            db = _db;
            _config = cf;
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
        {
            if (db.Users == null)
            {
                return Ok(new
                {
                    message = "Dữ liệu trống!",
                    status = 404
                });
            }
            var _data = await db.Users.ToListAsync();
            return Ok(new
            {
                message = "Lấy dữ liệu thành công!",
                status = 200,
                data = _data
            }); ;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser(Guid id)
        {
            if (db.Users == null)
            {
                return Ok(new
                {
                    message = "Dữ liệu trống!",
                    status = 404
                });
            }
            var _data = await db.Users.Where(x => x.Id == id).ToListAsync();
            return Ok(new
            {
                message = "Lấy dữ liệu thành công!",
                status = 200,
                data = _data
            }); ;
        }
        [HttpPost("register")]
        public async Task<ActionResult> AddUser([FromBody] User user)
        {
            var _user = await db.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            if(_user != null)
            {
                return Ok(new
                {
                    message = "Email đã tồn tại!",
                    status = 400
                });
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
            return Ok(new
            {
                message = "Tạo thành công!",
                status = 200,
                data = user
            });
        }
        [HttpPut("edit")]
        public async Task<ActionResult> Edit(User user)
        {
            var _user = await db.Users.FindAsync(user.Id);
            if (_user == null)
            {
                return Ok(new
                {
                    message = "Dữ liệu không tồn tại!",
                    status = 400
                });
            }
            db.Entry(await db.Users.FirstOrDefaultAsync(x => x.Id == _user.Id)).CurrentValues.SetValues(user);
            await db.SaveChangesAsync();
            return Ok(new
            {
                message = "Sửa thành công!",
                status = 200
            });
        }
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete([FromBody] Guid id)
        {
            if (db.Users == null)
            {
                return Ok(new
                {
                    message = "Dữ liệu trống!",
                    status = 404
                });
            }
            var _user = await db.Users.FindAsync(id);
            if (_user == null)
            {
                return Ok(new
                {
                    message = "Dữ liệu trống!",
                    status = 404
                });
            }
            try
            {
                db.Users.Remove(_user);
                await db.SaveChangesAsync();
                return Ok(new
                {
                    message = "Xóa thành công!",
                    status = 200
                });
            }
            catch (Exception e)
            {
                return Ok(new
                {
                    message = "Lỗi rồi!",
                    status = 400,
                    data = e.Message
                });
            }
        }
        [HttpPost("login")]
        public ActionResult Login([FromBody] Login user)
        {
            string _token = "";
            var _user = (from nv in db.Users
                            where nv.Email == user.email
                            select new
                            {
                                nv.Id,
                                nv.Password,
                                nv.Email,
                                nv.IdRole,
                                nv.Address,
                                nv.Name,
                                nv.CreateAt,
                                nv.Phone
                            }).ToList();
            if (_user == null)
            {
                return Ok(new
                {
                    message = "Tài khoản không tồn tại",
                    status = 404
                });
            }
            if (!BCrypt.Net.BCrypt.Verify(user.password, _user[0].Password))
            {
                return Ok(new
                {
                    message = "Sai mật khẩu",
                    status = 400
                });
            }
            try
            {
                _token = TokenHelper.Instance.CreateToken(_user[0].Email, _user[0].IdRole,db, _config);
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    message = "Thiếu dữ liệu",
                    status = 404
                });
            }
            return Ok(new
            {
                message = "Thành công",
                status = 200,
                data = _user,
                token = _token
            });
        }


    }
    public class Login
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}
