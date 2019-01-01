sonar-scanner \
	-Dsonar.projectKey=ounceofsilver_shabbat-logic \
	-Dsonar.organization=ounceofsilver \
	-Dsonar.sources=./src \
	-Dsonar.host.url=https://sonarcloud.io \
	-Dsonar.login=$SONARCLOUD_SHABBATLOGIC \
	-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
	-Dsonar.coverage.exclusions=**/*.spec.js,**/*.brutetest.js
