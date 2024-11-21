FROM amazon/aws-cli:2.15.3

RUN yum update -y
RUN amazon-linux-extras install -y docker
RUN curl -Lo copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-linux && chmod +x copilot && mv copilot /usr/local/bin/copilot

ENTRYPOINT []
WORKDIR /usr/src/app