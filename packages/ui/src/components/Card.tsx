import { Image, Text, View, type ImageSourcePropType } from 'react-native';
import { useTheme } from '../theme';
import { Button } from './Button';
import { Icon } from './Icon';
import { Tag, type TagVariant } from './Tag';

type CardAction = { label: string; onPress?: () => void };

export type CardProps = {
  title: string;
  description?: string;
  /** Cover image. `'placeholder'` shows the empty image state; omit for no image. */
  image?: ImageSourcePropType | 'placeholder';
  tag?: { label: string; variant?: TagVariant };
  /** Shown as a primary button. */
  primaryAction?: CardAction;
  /** Shown as a ghost button next to the primary one. */
  secondaryAction?: CardAction;
};

export function Card({ title, description, image, tag, primaryAction, secondaryAction }: CardProps) {
  const t = useTheme();
  const { spacer, container, widthHeight } = t.dimension;
  const imageHeight = widthHeight.wh200;

  return (
    <View
      style={{
        alignSelf: 'stretch',
        overflow: 'hidden',
        borderRadius: t.radius.lg,
        borderWidth: t.borderWidth.thin,
        borderColor: t.color.border.neutral.base,
        backgroundColor: t.color.surface.neutral.base,
      }}
    >
      {image === 'placeholder' ? (
        <View
          style={{
            height: imageHeight,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: t.color.surface.neutral.dim,
          }}
        >
          <Icon name="image" tone="muted" size={widthHeight.wh48} />
        </View>
      ) : image ? (
        <Image source={image} resizeMode="cover" style={{ height: imageHeight, width: '100%' }} accessibilityIgnoresInvertColors />
      ) : null}

      <View style={{ gap: spacer.sp8, padding: container.paddingGap.cardMd }}>
        {tag && <Tag label={tag.label} variant={tag.variant ?? 'brand'} />}
        <Text style={[t.typography.heading.md, { color: t.color.text.neutral.body }]}>{title}</Text>
        {description && (
          <Text style={[t.typography.body.sm, { color: t.color.text.neutral.subtext }]}>{description}</Text>
        )}
        {(primaryAction || secondaryAction) && (
          <View style={{ flexDirection: 'row', gap: spacer.sp8, paddingTop: spacer.sp8 }}>
            {primaryAction && <Button label={primaryAction.label} onPress={primaryAction.onPress} />}
            {secondaryAction && <Button variant="ghost" label={secondaryAction.label} onPress={secondaryAction.onPress} />}
          </View>
        )}
      </View>
    </View>
  );
}
