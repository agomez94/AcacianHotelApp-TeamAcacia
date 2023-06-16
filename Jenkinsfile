pipeline {
  environment {
  registry = 'eglad001/team-acacia'
  registryCredentials = 'teamacacia'
  cluster_name = 'team-acacia-eks2'
  namespace = 'team-acacia'
  }

  agent {
    node {
      label 'teamacacia'
    }

  }
  stages {
    stage('Git') {
      steps {
        git(url: 'https://github.com/agomez94/AcacianHotelApp-TeamAcacia.git', branch: 'main')
      }
    }

    stage('Build stage') {
      steps {
        sh 'pwd '
        sh 'ls'
        script {
          dockerImage = docker.build(registry, "-f ServerlessRealEstateApp-TeamAcacia/webapp/new-website/Dockerfile .")
        }

      }
    }

    stage('Deployment stage') {
      steps {
        script {
          docker.withRegistry('', registryCredentials) {
            dockerImage.push()
          }
        }

      }
    }

    stage('kubernetes') {
      steps {
        withCredentials(bindings: [aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'AWS2', secretKeyVariable: "AWS_SECRET_ACCESS_KEY")]) {
          sh "aws eks --region us-east-1 update-kubeconfig --name ${cluster_name}"
          sh "find / -name 'httpd.conf' -print"
          script {
            try {
              sh "kubectl create namespace ${namespace}"
            }
            catch (Exception e) {
              echo "Error / namespace already created"
            }
          }

          sh "kubectl apply -f ServerlessRealEstateApp-TeamAcacia/kubernetes/deployment.yaml -n ${namespace}"
          sh "kubectl -n ${namespace} rollout restart deployment team-acacia"
        }

      }
    }
  }
}
