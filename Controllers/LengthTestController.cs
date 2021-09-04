using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace UrlLengthTester.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LengthTestController : ControllerBase
    {
        [HttpGet]
        public int Get()
        {
            return this.Request.GetDisplayUrl().Length;
        }
    }
}