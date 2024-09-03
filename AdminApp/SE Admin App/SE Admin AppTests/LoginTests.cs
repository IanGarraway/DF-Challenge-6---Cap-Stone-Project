using Microsoft.VisualStudio.TestTools.UnitTesting;
using SE_Admin_App;
using Moq;
using Moq.Protected;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;


namespace SE_Admin_App.Tests
{
    [TestClass()]
    public class AdminServiceTests
    {
        [TestMethod()]
        public async Task Login_SuccessfulResponse_ReturnSucessStatusCode()
        {
            //Arrange
            var handlerMock = new Mock<HttpMessageHandler>();
            handlerMock
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{\"admin\": true, \"message\": \"Login successful\", \"username\": \"admin\"}"),
                }).Verifiable();

            var mockHttpClient = new HttpClient(handlerMock.Object);
            var mockCookieContainer = new CookieContainer();

            AdminService.ConfigureForTesting(mockHttpClient, mockCookieContainer);

            //Act
            var response = await AdminService.Login("admin", "wrongpassword");

            //Assert
            Assert.IsTrue(response.IsSuccessStatusCode);
            handlerMock.Protected().Verify(
                "SendAsync",
                Times.Once(),
                ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Post),
                ItExpr.IsAny<CancellationToken>()
                );

        }
    }
}