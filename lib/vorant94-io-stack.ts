import { Construct } from 'constructs';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  ObjectOwnership,
} from 'aws-cdk-lib/aws-s3';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';

export class Vorant94IoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const imagesBucket = new Bucket(this, `images-bucket`, {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      accessControl: BucketAccessControl.PRIVATE,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      autoDeleteObjects: true,
    });

    const imagesOriginAccessIdentity = new OriginAccessIdentity(
      this,
      'images-origin-access-identity'
    );
    imagesBucket.grantRead(imagesOriginAccessIdentity);

    const imagesOrigin = new S3Origin(imagesBucket, {
      originAccessIdentity: imagesOriginAccessIdentity,
    });
    new Distribution(this, 'images-distribution', {
      defaultBehavior: {
        origin: imagesOrigin,
      },
    });
  }
}
