using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using RoadBuddy.Application.Commands.RegisterQueque.Create;
using RoadBuddy.Application.DTOs.QueueRegister;
using RoadBuddy.Application.Interfaces;
using RoadBuddy.Domain.Entities;
using Xunit;

namespace RoadBuddy.Tests.Unit.Application.Command
{
    public class RegisterQueueCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldRegisterUserInQueueAndReturnResultDto()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var borderPointId = Guid.NewGuid();

            var mockQueueRepo = new Mock<IQueueEntryRepository>();
            var mockBorderPointRepo = new Mock<IBorderPointRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            var nextPosition = 3;

            mockQueueRepo.Setup(r => r.GetNextPositionAsync(borderPointId))
                         .ReturnsAsync(nextPosition);

            BorderPoint fakeBorderPoint = new BorderPoint
            {
                Id = borderPointId,
                Name = "Checkpoint A",
                Load = 5
            };

            mockBorderPointRepo.Setup(r => r.GetByIdAsync(borderPointId))
                               .ReturnsAsync(fakeBorderPoint);

            mockUnitOfWork.SetupGet(u => u.QueueEntryRepository).Returns(mockQueueRepo.Object);
            mockUnitOfWork.SetupGet(u => u.BorderPointRepository).Returns(mockBorderPointRepo.Object);
            mockUnitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

            var handler = new RegisterQueueCommandHandler(mockUnitOfWork.Object);
            var command = new RegisterQueueCommand(userId, borderPointId);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().NotBeNull();
            result.Position.Should().Be(nextPosition);
            result.BorderPointName.Should().Be("Checkpoint A");
            result.EstimatedWaitTime.Should().Be(TimeSpan.FromMinutes(5 * nextPosition));

            mockQueueRepo.Verify(r => r.AddAsync(It.Is<QueueEntry>(q =>
                q.UserId == userId &&
                q.Position == nextPosition &&
                q.BorderPointId == borderPointId)), Times.Once);

            mockUnitOfWork.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
            fakeBorderPoint.Load.Should().Be(6); // Load incremented
        }

        [Fact]
        public async Task Handle_ShouldThrowException_WhenBorderPointNotFound()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var borderPointId = Guid.NewGuid();

            var mockQueueRepo = new Mock<IQueueEntryRepository>();
            var mockBorderPointRepo = new Mock<IBorderPointRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            mockQueueRepo.Setup(r => r.GetNextPositionAsync(borderPointId))
                         .ReturnsAsync(1);

            mockBorderPointRepo.Setup(r => r.GetByIdAsync(borderPointId))
                               .ReturnsAsync((BorderPoint)null);

            mockUnitOfWork.SetupGet(u => u.QueueEntryRepository).Returns(mockQueueRepo.Object);
            mockUnitOfWork.SetupGet(u => u.BorderPointRepository).Returns(mockBorderPointRepo.Object);

            var handler = new RegisterQueueCommandHandler(mockUnitOfWork.Object);
            var command = new RegisterQueueCommand(userId, borderPointId);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}
