pipeline {
  environment{
  registry = "eglad001/team-acacia"
  registryCredentials = "teamacacia"
  cluster_name = "acacian-hotelapp"
  namespace = "team-acacia"
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

    stage ('Build stage') {
      steps {
        script {
          dockerImage = docker.build(registry)
        }
      }
    }

    stage('Deployment stage'){
      steps {
        script {
          docker.withRegistry('', registryCredentials) {
            dockerImage.push()
          }
        }
      }
    }
// This allows us to deploy kubernetes as a stage in Jenkins
  stage('kubernetes') {
    steps {
      withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'AWS', secretKeyVariable: "AWS_SECRET_ACCESS_KEY")]) {
        sh "aws eks --region us-east-1 update-kubeconfig --name ${cluster_name}"
        script {
          try {
            sh "kubectl create namespace ${namespace}"
          }
          catch (Exception e) {
            echo "Error / namespace already created"
          }
        }
        sh "kubectl apply -f ./deployment.yaml -n ${namespace}"
        sh "kubectl -n ${namespace} rollout restart deployment team-acacia"
      }
    }
  }
  }
}