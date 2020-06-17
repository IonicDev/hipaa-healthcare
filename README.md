<h1>Ionic Machina Healthcare Demo</h1>

The Machina Healthcare Demo App is a simple web application that illustrates how distinct roles within a customer's application can be defined and used to restrict ePHI access in a HIPAA-compliant manner. The Demo App is based on use case involving a hypothetical business scenario involving a patient, physician and insurance provider.<br/>
Read more in our [HIPAA and Healthcare Use Case](https://ionic.com/developers/use-cases-hipaa/) and our [Quickstart Guide](https://ionic.com/developers/hipaa-example-application-setup/).<br/>
See content from the U.S. Department of Health and Human Services regarding [Guidance on HIPAA & Cloud Computing](https://www.hhs.gov/hipaa/for-professionals/special-topics/cloud-computing/index.html).<br/>
See content from the Office of the National Coordinator for Health Information Technology (ONC) regarding [Privacy, Security, and HIPAA](https://www.healthit.gov/topic/privacy-security-and-hipaa).
<br/>
<br/>
<h2>Prerequisites</h2>

<ul>
<li>Node.js >= 10 is required</li>
<li>A Machina account with administrator credentials.</li>

>You can create a Machina account by selecting [Start for Free](https://ionic.com/start-for-free/).

<li>An AWS account with API key access (see next section: AWS Credentials).</li>
<li>Supported browsers: Chrome, Firefox, Safari, Opera.</li>
</ul>
<br/>
<h2>AWS credentials</h2>

<ol>
<li>Create an AWS account to store your app's encrypted data</li>

>[Create AWS account](https://portal.aws.amazon.com/billing/signup).

<li>Create an _Access Key_ for your AWS user.</li>

>Use this guide to [get your AWS Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

</ol>
<br/>
<h2>Configure and Run the Demo</h2>

<ul>
<li>Clone the Demo application:</li>

```
git clone https://github.com/IonicDev/hipaa-healthcare.git
```

<li>Using the command line interface, copy the file '.env.example' under the name '.env':</li>
<ul>
<li>on FreeBSD / Linux / Mac OS:</li>

```
cp .env.example .env
```

<li>on Windows:</li>

```
copy .env.example .env
```

</ul>
<li>Fill in the Ionic and AWS values inside of .env file. The following environment variables must be defined to run the server:</li>

```
| Variable Name             | Description  |
| ------------------------- | ------------ |
| IONIC_ENROLLMENT_ENDPOINT | URL of your Ionic Enrollment Server. Used for SAML assertion generation |
| IONIC_TENANT_ID           | Your Ionic tenant ID |
| IONIC_API_AUTH_TOKEN      | Your Ionic API Key Secret Token (for accessing Management API). Must include SCIM User and Group management scopes |
| AWS_ACCESS_KEY_ID         | Your AWS Access Key ID. This is read by the `aws-sdk` to authenticate requests to DynamoDB |
| AWS_SECRET_ACCESS_KEY     | Your AWS Access Secret Key. This is read by the `aws-sdk` to authenticate requests to DynamoDB |
```

Details on creating and obtaining these values can be found in our [quickstart guide](https://ionic.com/developers/hipaa-example-application-setup/).

<li>Install dependencies:</li>

```
npm install
```

<li>Run the <strong>setup</strong> script:</li>

```
npm run setup
```

The setup script creates three groups in Machina Dashboard: _Patients_, _Physicians_ and _Insurers_.<br/>
The setup script also creates Machina _Data Marking Values_ and _Data Policies_ in Machina Dashboard.<br/>
>To learn more about groups, data markings and data policies, explore the [quickstart guide](https://ionic.com/developers/hipaa-example-application-setup/).

<ul>
<li>Troubleshoot setup (if needed):</li>

```
Something went wrong: { UnrecognizedClientException: The security token included in the request is invalid.
    at Request.extractError (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/protocol/json.js:51:27)
    at Request.callListeners (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/sequential_executor.js:106:20)
    at Request.emit (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/sequential_executor.js:78:10)
    at Request.emit (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/request.js:683:14)
    at Request.transition (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/request.js:22:10)
    at AcceptorStateMachine.runTo (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/state_machine.js:14:12)
    at /Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/state_machine.js:26:10
    at Request.<anonymous> (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/request.js:38:9)
    at Request.<anonymous> (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/request.js:685:12)
    at Request.callListeners (/Users/myuser/hipaa-demo/node_modules/aws-sdk/lib/sequential_executor.js:116:18)
```
<ol>
<li>Verify AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set to the correct values for your AWS User.</li>

<ul>
<li>on FreeBSD / Linux / Mac OS:</li>

```
hipaa-demo $ cat .env
```

<li>on Windows:</li>
<ul>
<li>cmd or powershell</li>

```
hipaa-demo $ type .env
```

<li>powershell</li>

```
hipaa-demo $ cat .env
```

</ul>
</ul>
<em>content from .env file:</em>

```
...
AWS_ACCESS_KEY_ID=YOUR_ACCESSKEYID_HERE
AWS_SECRET_ACCESS_KEY=YOUR_SECRETACCESSKEY_HERE
...
```

<li>Check if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY have been set in terminal's environment. If so, verify they are set to the correct values for your AWS User.</li>

<ul>
<li>on FreeBSD / Linux / Mac OS:</li>
Update on command line with export command, or add export command to ~/.bash_profile.

```
export AWS_ACCESS_KEY_ID=YOURACCESSKEYIDHERE
export AWS_SECRET_ACCESS_KEY=YOURSECRETACCESSKEYHERE
```

<li>on Windows:</li>
Update on command line with set command, or add variables to user environment.

```
set AWS_ACCESS_KEY_ID=YOURACCESSKEYIDHERE
set AWS_SECRET_ACCESS_KEY=YOURSECRETACCESSKEYHERE
```
</ul>
<li>Check if AWS command line configuration has been set. If so, verify AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set to correct values for your AWS User.  Update with aws configure command if needed.</li>

```
aws configure
AWS Access Key ID [****************OYHQ]: YOURACCESSKEYIDHERE
AWS Secret Access Key [****************GXzW]: YOURSECRETACCESSKEYHERE
Default region name [us-east-1]: YOURREGIONHERE
Default output format [None]:
```

> For more on Amazon S3 AWS Regions, see [AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).

</ol>
</ul>

<li>Run the Demo with the following command:</li>

```
npm start
```

<li>Browse to http://localhost:8080 to explore the Demo and see how the Machina Policy Engine can be used, via Machina keys and Data Policy logic, to grant data access to allowed users.</li>
</ul>

