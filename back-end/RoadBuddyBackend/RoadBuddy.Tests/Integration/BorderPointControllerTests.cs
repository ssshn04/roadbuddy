using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using RoadBuddy.Application.DTOs.BorderPoint;
using Xunit;

namespace RoadBuddy.IntegrationTests;

public class BorderPointControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public BorderPointControllerTests(CustomWebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task CreateBorderPoint_ShouldReturnOkWithId()
    {
        // Arrange
        var dto = new CreateBorderPointDto
        {
            Name = "Ягодин",
            Location = "Волинська область"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/BorderPoint", dto);

        // Assert
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<CreateResult>();
        result.Should().NotBeNull();
        result!.id.Should().BeGreaterThan(0);
    }

    private class CreateResult
    {
        public int id { get; set; }
    }
}
