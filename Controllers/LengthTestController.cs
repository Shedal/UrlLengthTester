using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace UrlLengthTester.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LengthTestController : ControllerBase
    {
        [HttpGet]
        public string Get(string p)
        {
            p ??= string.Empty;

            return $"URL length: {this.Request.GetDisplayUrl().Length}. Parameter length: {p.Length}.";
        }
    }
}