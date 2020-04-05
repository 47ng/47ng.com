import React from 'react'
import { NextPage } from 'next'
import { Stack, Heading, Text } from '@chakra-ui/core'
import { FlexContainer, defaultTheme, Card } from '@47ng/chakra-next'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import AcronymRotator from '../components/AcronymRotator'
import Logo from '../components/Logo'

// --

const IndexPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="47ng"
        description="Engineering for the post-surveillance age."
        canonical="https://47ng.com"
        additionalMetaTags={[
          { property: 'author', content: 'François Best' },
          {
            property: 'keywords',
            content: [
              'bio',
              'homepage',
              'engineer',
              'developer',
              'freelance',
              'remote',
              'typescript',
              'node.js',
              'node',
              'react',
              'open-source',
              'open source',
              'privacy',
              'security',
              'cryptography',
              'e2ee',
              'end-to-end encryption',
              'end to end encryption',
              'surveillance',
              'web',
            ].join(','),
          },
        ]}
        twitter={{
          cardType: 'summary',
          handle: 'fortysevenfx',
          site: 'fortysevenfx',
        }}
        openGraph={{
          type: 'website',
          site_name: '47ng',
          profile: {
            firstName: 'François',
            lastName: 'Best',
          },
          // todo: Add images
        }}
      />
      <Stack as="header" isInline spacing={2} alignItems="center" p={4}>
        <Logo size={6} />
        <AcronymRotator
          _hover={{ color: 'gray.800' }}
          _active={{ color: 'gray.600' }}
        />
      </Stack>
      <FlexContainer wide mt={12} color="#2f2f2f">
        <Logo size={48} mx="auto" />
        <Heading as="h1" textAlign="center" fontWeight="semibold" mt={2}>
          47ng
        </Heading>
        <Text fontSize="lg" textAlign="center" mt={12}>
          Engineering for the post-surveillance age
        </Text>
        <Card mt={8}>Foo</Card>
      </FlexContainer>
    </>
  )
}

export default IndexPage
